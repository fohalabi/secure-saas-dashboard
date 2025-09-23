import { NextRequest, NextResponse } from "next/server";
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { db }  from '../../../../../prisma/lib/db';

export async function POST(request: NextRequest) {
    try {
        const { email, name } = await request.json()

        if (!email || !name) {
            return NextResponse.json(
                { error: 'Email and name are required' },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 409 }
            )
        }

        // Generate registration options
        const options = await generateRegistrationOptions({
            rpName: process.env.WEBAUTHN_RP_NAME || 'SaaS Dashboard',
            rpID: process.env.WEBAUTHN_RP_ID || 'localhost',
            userID: new TextEncoder().encode(email), // Use email as user ID for now
            userName: email,
            userDisplayName: name,
            timeout: 60000, // 1 minute
            attestationType: 'none',
            excludeCredentials: [], // No existing credentials to exclude
            authenticatorSelection: {
                residentKey: 'preferred',
                userVerification: 'preferred',
            },
            supportedAlgorithmIDs: [-7, -257], //ES256 and RS356
        })

        // Store challenge in database for verification
        await db.authChallenge.create({
            data: {
                challenge: options.challenge,
                type: 'REGISTRATION',
                expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
                options: {
                    email,
                    name,
                },
            },
        })

        return NextResponse.json(options)
    } catch (error) {
        console.error('Registration challenge error:', error)
        return NextResponse.json(
            { error: 'Failed to generate registration challenge' },
            { status: 500 }
        )
    }
}