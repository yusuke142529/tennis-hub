// app/api/verify-email/[token]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
    const { token } = params
    const user = await prisma.user.findFirst({
        where: { email_verify_token: token }
    })
    if (!user) return NextResponse.json({ error: "Invalid token" }, { status: 400 })

    await prisma.user.update({
        where: { id: user.id },
        data: {
            email_verified_at: new Date(),
            email_verify_token: null
        }
    })

    return NextResponse.json({ message: "Email verified. You can now sign in." })
}