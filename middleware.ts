import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './lib/auth';

// Define protected and public route
const protectedRoutes = ['/dashboard', '/team', '/projects', '/billing', '/admin', '/account']
const publicRoutes = ['/auth', '/login', '/register', '/', '/api/auth']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Skip middleware for static files and most API routes
    if(
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.includes('.') ||
        (pathname.startsWith('/api') && !pathname.startsWith('/api/auth'))
    ) {
        return NextResponse.next()
    }

    // Get Current user session
    const user = await getCurrentUser(request)

    // Checkk route types
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    const isAuthRoute = pathname.startsWith('/auth') || pathname === '/login' || pathname === '/register'

    // Redirect authenticated users away from auth pages
    if (user && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Redirect authenticated users away from auth pages
    if (user && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Redirect unauthenticated users to auth page
    if (!user && isProtectedRoute) {
        const authUrl = new URL('/auth', request.url)
        authUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(authUrl)
    }

    // Add user info to headers for API routes and pages
    const response = NextResponse.next()
    if (user) {
        response.headers.set('x-user-id', user.id)
        response.headers.set('x-user-email', user.email)
    }

    return response
}

export const config = {
    matcher: [
        /* 
            * Match all request paths except:
            * - _next/static (static files)
            * - _next/image (image optimization files)
            * - favicon.ico (favicon file)
            * - public files with extensions
        */
       '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}