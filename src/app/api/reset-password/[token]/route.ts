// app/api/reset-password/[token]/route.ts
import { NextRequest, NextResponse } from "next/server"
import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/hash'

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
    const { password } = await req.json()
    if (!password) return NextResponse.json({ error: "Password required" }, { status: 400 })

    const user = await prisma.user.findFirst({
        where: {
            reset_password_token: params.token,
            reset_password_expires: { gt: new Date() }
        }
    })
    if (!user) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })

    const pwdHash = await hashPassword(password)
    await prisma.user.update({
        where: { id: user.id },
        data: {
            password_hash: pwdHash,
            reset_password_token: null,
            reset_password_expires: null
        }
    })

    return NextResponse.json({ message: "Password reset successful" })
}