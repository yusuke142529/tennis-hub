// app/api/posts/[id]/route.ts

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { postSchema } from "@/lib/zodSchemas"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10)
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { user: true, category: true }
    })
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(post)
  } catch (error: any) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const postId = parseInt(params.id, 10)
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const isAdmin = session.user.role === 'admin'
    // session.user.id がstringの場合を想定してparseInt
    const isAuthor = post.user_id === parseInt(session.user.id.toString(), 10)
    if (!isAdmin && !isAuthor) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const json = await req.json()
    const parsed = postSchema.safeParse(json)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 })

    const updateData = { ...parsed.data } as any

    // categoryIdをnumberへ変換
    if ('categoryId' in updateData) {
      updateData.categoryId = updateData.categoryId ? parseInt(updateData.categoryId.toString(), 10) : null
    }

    const updated = await prisma.post.update({
      where: { id: postId },
      data: updateData,
      include: { user: true, category: true }
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const postId = parseInt(params.id, 10)
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const isAdmin = session.user.role === 'admin'
    const isAuthor = post.user_id === parseInt(session.user.id.toString(), 10)
    if (!isAdmin && !isAuthor) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    await prisma.post.delete({ where: { id: postId } })
    return NextResponse.json({ message: "Deleted" })
  } catch (error: any) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}