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
            transports: ['internal', 'hybrid'],
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
    console.log('Session created:', session.token ? 'YES' : 'NO');
    console.log('Cookie being set:', session.token.substring(0, 20) + '...');

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

    console.log('Setting session cookie:', session.token ? 'Token exists' : 'No token')
    console.log('Cookie value preview:', session.token.substring(0, 20) + '...')

    // Set session cookie with explicit options
    response.cookies.set({
      name: 'session',
      value: session.token,
      httpOnly: true,
      secure: false, // Set to false for localhost
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60,
      path: '/',
    })

    console.log('Cookie set in response')

    return response
  } catch (error) {
    console.error('=== REGISTRATION ERROR (PERSISTENT) ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    console.error('=== END ERROR LOG ===');
    
    // Also log to a file or database for persistence
    await db.auditLog.create({
      data: {
        action: 'user.register.failed',
        success: false,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : null
        }
      }
    }).catch(() => {
      // Ignore audit log failures
    });

    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
    
