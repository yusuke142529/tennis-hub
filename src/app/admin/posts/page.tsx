// src/app/admin/posts/page.tsx (サーバーコンポーネント例)
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import AdminPostsClient from './AdminPostsClient'

export const metadata: Metadata = {
  title: '記事管理',
}

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    include: { category: true },
    orderBy: { updatedAt: 'desc' }
  })

  // 取得したpostsをクライアント側へ渡す
  return <AdminPostsClient posts={posts} />
}