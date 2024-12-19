// app/api/posts/[id]/best-answer/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

    const { commentId } = await req.json()
    const postId = parseInt(params.id, 10)
    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const userId = parseInt(session.user.id, 10)
    if (post.user_id !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const bestAnswerId = commentId ? parseInt(commentId.toString(), 10) : null
    const updated = await prisma.post.update({
        where: { id: postId },
        data: {
            best_answer_comment_id: bestAnswerId
        }
    })

    return NextResponse.json(updated)
}