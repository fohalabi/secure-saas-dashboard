import { db } from '../../../prisma/lib/db';
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const userCount = await db.user.count()
    const teamCount = await db.team.count()
    
    return NextResponse.json({
      success: true,
      message: 'Database connected!',
      stats: {
        users: userCount,
        teams: teamCount
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}