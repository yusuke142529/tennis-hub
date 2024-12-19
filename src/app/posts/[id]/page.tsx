
// src/app/posts/[id]/page.tsx

import prisma from '@/lib/prisma'
import ClientPostDetail from './ClientPostDetail'
import { notFound } from 'next/navigation'

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // paramsがPromiseになっているためawait
  const { id } = await params
  const postId = parseInt(id, 10)

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { user: true }
  })

  if (!post) {
    notFound()
  }

  return <ClientPostDetail post={post} />
}