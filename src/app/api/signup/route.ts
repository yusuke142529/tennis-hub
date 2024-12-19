// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { signupSchema } from '@/lib/zodSchemas'
import { hashPassword } from '@/lib/hash'
import { v4 as uuidv4 } from 'uuid'
import { sendMockMail } from '@/lib/mail' //モックメール送信

export async function POST(req: NextRequest) {
    const json = await req.json()
    const parseResult = signupSchema.safeParse(json)
    if (!parseResult.success) {
        return NextResponse.json({ error: parseResult.error.message }, { status: 400 })
    }

    const { email, password } = parseResult.data
    const exist = await prisma.user.findUnique({ where: { email } })
    if (exist) return NextResponse.json({ error: "User already exists" }, { status: 400 })

    const pwdHash = await hashPassword(password)
    const token = uuidv4()
    const user = await prisma.user.create({
        data: {
            email,
            password_hash: pwdHash,
            email_verify_token: token,
            profile: { create: { display_name: email.split('@')[0] } }
        }
    })

    // メール送信mock
    await sendMockMail(email, `Verify your email: ${process.env.NEXTAUTH_URL}/verify-email/${token}`)

    return NextResponse.json({ message: "User created. Check your email for verification." }, { status: 201 })
}