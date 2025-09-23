import { NextRequest, NextResponse } from "next/server";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { db } from '../../../../../prisma/lib/db';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json()
        
        console.log('Login attempt for email:', email)

        const user = await db.user.findUnique({
            where: { email },
            include: { credentials: {
                    // Get all credentials
                    orderBy: { createdAt: 'desc' }
                }
            }
        })

        console.log('Found user:', user ? 'Yes' : 'No')
        console.log('User credentials count:', user?.credentials.length || 0)

        if (user?.credentials.length) {
            console.log('Credentials:', user.credentials.map(c => ({
                id: c.id,
                credentialId: c.credentialId.substring(0, 20) + '...',
                lastUsedAt: c.lastUsedAt
            })))
        }

        if (!user || !user.isActive) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        if (user.credentials.length === 0) {
            return NextResponse.json({ error: 'No credentials found for user' }, { status: 404 })
        }

        const allowCredentials = user.credentials.map(cred => ({
            id: cred.credentialId,
            type: 'public-key' as const,
            transports: cred.transports as AuthenticatorTransport[], // Make sure this line ends with a comma
        }))

        const options = await generateAuthenticationOptions({
            timeout: 60000,
            allowCredentials,
            userVerification: 'preferred',
            rpID: process.env.WEBAUTHN_RP_ID || 'localhost',
        })

        await db.authChallenge.create({
            data: {
                challenge: options.challenge,
                userId: user.id,
                type: 'AUTHENTICATION',
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            },
        })

        return NextResponse.json(options)
    } catch (error) {
        console.error('Login challenge error:', error)
        return NextResponse.json({ error: 'Failed to generate challenge' }, { status: 500 })
    }
}