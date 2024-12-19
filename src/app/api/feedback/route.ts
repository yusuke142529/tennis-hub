import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const { postId, helpful } = await req.json()

        if (typeof postId !== 'number' || typeof helpful !== 'boolean') {
            return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 })
        }

        await prisma.feedback.create({
            data: {
                postId,
                helpful,
            }
        })

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}