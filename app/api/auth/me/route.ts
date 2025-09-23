import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '../../../../lib/auth'
import { db } from '../../../../prisma/lib/db';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Get user with full details including teams and credentials
    const fullUser = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        createdAt: true,
        lastLoginAt: true,
        teamMemberships: {
          where: { isActive: true },
          include: {
            team: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        credentials: {
          select: {
            id: true,
            name: true,
            deviceType: true,
            createdAt: true,
            lastUsedAt: true,
          },
        },
      },
    })

    if (!fullUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      user: fullUser,
      teams: fullUser.teamMemberships.map(tm => ({
        id: tm.team.id,
        name: tm.team.name,
        slug: tm.team.slug,
        role: tm.role,
        joinedAt: tm.joinedAt,
      })),
      credentials: fullUser.credentials,
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 })
  }
}