import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from '@/lib/prisma'
import { postSchema } from '@/lib/zodSchemas'

// GET: 記事一覧取得（検索、カテゴリ絞り込み、ページネーション対応）
// クエリパラメータ:
// search: キーワード検索
// category_id: カテゴリID
// page: ページ番号（デフォルト1）
// limit: 1ページあたりの記事数（デフォルト10）
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const categoryId = searchParams.get('category_id')
  const pageStr = searchParams.get('page') || '1'
  const limitStr = searchParams.get('limit') || '10'

  const page = parseInt(pageStr, 10)
  const limit = parseInt(limitStr, 10)

  if (isNaN(page) || page < 1) {
    return NextResponse.json({ error: 'Invalid page parameter' }, { status: 400 })
  }
  if (isNaN(limit) || limit < 1 || limit > 100) {
    return NextResponse.json({ error: 'Invalid limit parameter (1-100)' }, { status: 400 })
  }

  const where: any = {}

  if (search) {
    // タイトル・本文・タグ検索をLIKEで行うにはOR条件などを検討可能
    // ここではタイトルのみ
    where.title = { contains: search }
  }

  if (categoryId) {
    const catIdNum = parseInt(categoryId, 10)
    if (isNaN(catIdNum)) {
      return NextResponse.json({ error: 'Invalid category_id parameter' }, { status: 400 })
    }
    where.categoryId = catIdNum
  }

  try {
    const totalCount = await prisma.post.count({ where })

    const posts = await prisma.post.findMany({
      where,
      include: {
        user: true,
        category: true // カテゴリ情報を含める
      },
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    return NextResponse.json({
      count: totalCount,
      data: posts
    })
  } catch (error: any) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST: 記事新規作成（管理者のみ）
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // roleチェック
  if (session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let json
  try {
    json = await req.json()
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = postSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 })
  }

  const { title, content, categoryId, thumbnail } = parsed.data

  // カテゴリが指定されている場合は数値変換
  let categoryIdValue: number | null = null
  if (categoryId !== null && categoryId !== undefined) {
    const catNum = parseInt(categoryId.toString(), 10)
    if (isNaN(catNum)) {
      return NextResponse.json({ error: 'Invalid categoryId' }, { status: 400 })
    }
    categoryIdValue = catNum
  }

  try {
    const post = await prisma.post.create({
      data: {
        user_id: parseInt(session.user.id.toString(), 10),
        title,
        content,
        categoryId: categoryIdValue,
        thumbnail
      },
      include: { user: true, category: true }
    })

    console.log("Created post:", post)
    return NextResponse.json(post, { status: 201 })
  } catch (error: any) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}