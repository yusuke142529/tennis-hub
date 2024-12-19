// src/app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from '@/lib/prisma'
import { profileSchema } from '@/lib/zodSchemas'

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const userId = parseInt(session.user.id, 10)
    const profile = await prisma.profile.findUnique({
        where: { user_id: userId }
    })

    return NextResponse.json(profile)
}

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const json = await req.json()
    const parsed = profileSchema.safeParse(json)
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues.map(i => i.message).join(', ') }, { status: 400 })
    }

    const userId = parseInt(session.user.id, 10)
    const updated = await prisma.profile.update({
        where: { user_id: userId },
        data: parsed.data
    })

    return NextResponse.json(updated)
}