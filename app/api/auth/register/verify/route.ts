import { NextRequest, NextResponse } from "next/server";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { db } from '../../../../../prisma/lib/db';
import { createSession } from '../../../../../lib/auth';


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
        const { credential, challenge } = await request.json()

        if (!credential || !challenge) {
            return NextResponse.json(
                {error: 'Missing credential or challenge' },
                { status: 400 }
            )
        }

        // Find and validate challenge
        const storedChallenge = await db.authChallenge.findUnique({
            where: { challenge },
        })

        if (!storedChallenge || storedChallenge.expiresAt < new Date()) {
            return NextResponse.json(
                { error: 'Invalid or expired challenge' },
                { status: 400 }
            )
        }

        if (storedChallenge.type !== 'REGISTRATION') {
            return NextResponse.json(
                { error: 'Invalid challenge type' },
                { status: 400 }
            )
        }

        // Verify the registration response
        const verification = await verifyRegistrationResponse({
            response: credential,
            expectedChallenge: challenge,
            expectedOrigin: process.env.WEBAUTHN_RP_ORIGIN || 'http://localhost:3000',
            expectedRPID: process.env.WEBAUTHN_RP_ID || 'localhost',
        })

        if (!verification.verified || !verification.registrationInfo) {
            return NextResponse.json(
                { error: 'Registration verification failed' },
                { status: 400 }
            )
        }

        const registrationInfo = verification.registrationInfo
        const { publicKey, id, counter } = registrationInfo.credential

    // Get user info from challenge options
    const { email, name } = storedChallenge.options as { email: string; name: string }

    // Create user and credential in transaction
    const result = await db.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          name,
          isActive: true,
        },
      })

        // Create credential
        const newCredential = await tx.credential.create({
            data: {
            userId: user.id,
            credentialId: Buffer.from(id).toString('base64'),
            publicKey: Buffer.from(publicKey),
            counter: BigInt(counter),
            transports: credential.response.transports || [],
            name: `${name}'s Passkey`,
            deviceType: credential.authenticatorAttachment === 'platform' ? 'platform' : 'cross-platform',
            backupEligible: registrationInfo.credentialBackedUp || false,
            backupState: registrationInfo.credentialBackedUp || false,
            },
        })

      return { user, credential: newCredential }
    })

    // Clean up challenge
    await db.authChallenge.delete({
      where: { challenge },
    })

    // Create session
    const session = await createSession(result.user.id, request)

    // Log registration
    await db.auditLog.create({
      data: {
        userId: result.user.id,
        action: 'user.register',
        success: true,
        ipAddress: getClientIP(request),
        userAgent: request.headers.get('user-agent') || 'unknown',
        metadata: {
          method: 'webauthn',
          credentialId: result.credential.id,
        },
      },
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
      },
    })

    // Set session cookie
    response.cookies.set('session', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60, // 90 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Registration verification error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
    
