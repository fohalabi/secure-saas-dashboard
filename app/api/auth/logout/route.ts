import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, revokeSession } from '../../../../lib/auth'
import { db } from '../../../../prisma/lib/db';

function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    
    if (realIp) {
        return realIp;
    }
    
    return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Get session from cookie and revoke it
    const sessionCookie = request.cookies.get('session')
    if (sessionCookie) {
      try {
        const payload = JSON.parse(
          Buffer.from(sessionCookie.value.split('.')[1], 'base64').toString()
        )
        await revokeSession(payload.sessionId)
      } catch (error) {
        console.error('Error revoking session:', error)
      }
    }

    // Log logout in audit trail
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'user.logout',
        success: true,
        ipAddress: getClientIP(request),
        userAgent: request.headers.get('user-agent') || 'unknown',
        metadata: { method: 'manual' },
      },
    })

    const response = NextResponse.json({ success: true })
    
    // Clear session cookie
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}