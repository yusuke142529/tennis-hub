// app/api/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server"
import prisma from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'
import { sendMockMail } from '@/lib/mail'

export async function POST(req: NextRequest) {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        // ユーザー不存在でも成功返す（セキュリティ的観点から）
        return NextResponse.json({ message: "Check your email" }, { status: 200 })
    }

    const token = uuidv4()
    await prisma.user.update({
        where: { id: user.id },
        data: { reset_password_token: token, reset_password_expires: new Date(Date.now() + 3600 * 1000) }
    })

    await sendMockMail(email, `Reset your password: ${process.env.NEXTAUTH_URL}/reset-password/${token}`)

    return NextResponse.json({ message: "Check your email" }, { status: 200 })
}