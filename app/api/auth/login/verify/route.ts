import { NextRequest, NextResponse } from 'next/server'
import { verifyAuthenticationResponse } from '@simplewebauthn/server'
import { db } from '../../../../../prisma/lib/db';
import { createSession } from '../../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { credential, challenge } = await request.json()

    const storedChallenge = await db.authChallenge.findUnique({
      where: { challenge },
      include: { user: { include: { credentials: true } } }
    })

    if (!storedChallenge || storedChallenge.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Invalid challenge' }, { status: 400 })
    }

    const credentialIdBase64 = Buffer.from(credential.rawId, 'base64').toString('base64')
    const userCredential = storedChallenge.user!.credentials.find(
      cred => cred.credentialId === credentialIdBase64
    )

    if (!userCredential) {
      return NextResponse.json({ error: 'Credential not found' }, { status: 400 })
    }

    const verification = await verifyAuthenticationResponse({
        response: credential,
        expectedChallenge: challenge,
        expectedOrigin: process.env.WEBAUTHN_RP_ORIGIN || 'http://localhost:3000',
        expectedRPID: process.env.WEBAUTHN_RP_ID || 'localhost',
        credential: {
            id: userCredential.credentialId,  // Keep as string, don't convert to Buffer
            publicKey: new Uint8Array(userCredential.publicKey),  // Convert to proper Uint8Array
            counter: Number(userCredential.counter),
            transports: userCredential.transports as AuthenticatorTransport[],
        },
    })

    if (!verification.verified) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 400 })
    }

    // Update credential and create session
    await db.credential.update({
      where: { id: userCredential.id },
      data: { 
        counter: BigInt(verification.authenticationInfo.newCounter),
        lastUsedAt: new Date() 
      }
    })

    await db.authChallenge.delete({ where: { challenge } })
    
    const session = await createSession(storedChallenge.user!.id, request)

    const response = NextResponse.json({ success: true, user: storedChallenge.user })
    response.cookies.set('session', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login verify error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}