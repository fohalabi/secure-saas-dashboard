import { NextRequest } from 'next/server';
import { db } from '../prisma/lib/db';
import { hash, compare } from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

export interface SessionUser {
    id: string
    email: string
    name: string | null
    isActive: boolean
}

export interface SessionData {
    userId: string
    sessionId: string
    iat: number
    exp: number
}

// Helper function to get client IP
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

// Create a new session
export async function createSession(userId: string, request: NextRequest) {
    try {
        const sessionId = crypto.randomUUID()
        const token = await new SignJWT({ userId, sessionId })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('90d')
            .sign(JWT_SECRET)

        const hashedToken = await hash(token, 10)
        const clientIP = getClientIP(request)

        const session = await db.session.create({
            data: {
                id: sessionId,
                userId,
                token: hashedToken,
                expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                ipAddress: clientIP,
                userAgent: request.headers.get('user-agent') || 'unknown',
                deviceInfo: {
                    ip: clientIP,
                    userAgent: request.headers.get('user-agent'),
                },
            },
        })

        return { token, session }
    }   catch (error) {
        console.error('Error creating session:', error)
        throw new Error('Failed to create session')
    }
}

// Verify and get session
export async function getSession(token: string): Promise<SessionUser | null> {
  try {
    if (!token) return null

    const { payload } = await jwtVerify(token, JWT_SECRET)
    const sessionData = payload as unknown as SessionData
    const { sessionId } = sessionData

    const session = await db.session.findUnique({
      where: { id: sessionId, isActive: true },
      include: { user: true },
    })

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await db.session.update({
          where: { id: sessionId },
          data: { isActive: false },
        })
      }
      return null
    }

    const isValidToken = await compare(token, session.token)
    if (!isValidToken) return null

    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      isActive: session.user.isActive,
    }
  } catch (error) {
    console.error('Error verifying session:', error)
    return null
  }
}

// Revoke session
export async function revokeSession(sessionId: string, revokedBy?: string) {
  try {
    await db.session.update({
      where: { id: sessionId },
      data: {
        isActive: false,
        revokedAt: new Date(),
        revokedBy,
      },
    })
  } catch (error) {
    console.error('Error revoking session:', error)
    throw new Error('Failed to revoke session')
  }
}

// Middleware helper to get current user
export async function getCurrentUser(request: NextRequest): Promise<SessionUser | null> {
  const sessionCookie = request.cookies.get('session')
  if (!sessionCookie) return null
  return getSession(sessionCookie.value)
}

// Revoke all user sessions
export async function revokeAllUserSessions(userId: string) {
  try {
    await db.session.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false, revokedAt: new Date() },
    })
  } catch (error) {
    console.error('Error revoking all sessions:', error)
    throw new Error('Failed to revoke sessions')
  }
}

// Cleanup expired sessions
export async function cleanupExpiredSessions() {
  try {
    const result = await db.session.updateMany({
      where: { expiresAt: { lt: new Date() }, isActive: true },
      data: { isActive: false, revokedAt: new Date() },
    })
    console.log(`Cleaned up ${result.count} expired sessions`)
    return result.count
  } catch (error) {
    console.error('Error cleaning up sessions:', error)
    return 0
  }
}