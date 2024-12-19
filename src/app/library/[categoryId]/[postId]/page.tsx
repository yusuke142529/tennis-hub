import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Box, Heading, Text, Link as ChakraLink, Image, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stack, Card, CardHeader, Button, useToast } from "@chakra-ui/react"
import NextLink from "next/link"
import { useEffect, useState } from "react"

// フィードバック送信用コンポーネント(クライアント側)
function FeedbackButtons({ postId }: { postId: number }) {
  const [hasFeedback, setHasFeedback] = useState(false)
  const toast = useToast()

  async function sendFeedback(helpful: boolean) {
    if (hasFeedback) return
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, helpful })
    })
    if (res.ok) {
      setHasFeedback(true)
      toast({
        title: "フィードバックありがとうございます！",
        status: "success",
        duration: 3000,
        isClosable: true
      })
    } else {
      toast({
        title: "フィードバック送信に失敗しました",
        status: "error",
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Box mt={6} aria-label="記事フィードバック">
      <Text fontSize="sm" mb={2}>この情報は役に立ちましたか？</Text>
      <Stack direction="row" spacing={2}>
        <Button size="sm" onClick={() => sendFeedback(true)} isDisabled={hasFeedback}>役に立った</Button>
        <Button size="sm" onClick={() => sendFeedback(false)} isDisabled={hasFeedback}>情報不足</Button>
      </Stack>
    </Box>
  )
}

type Props = {
  params: {
    categoryId: string,
    postId: string
  }
}

// サーバーコンポーネントでメタデータ設定
export const metadata = {
  title: "記事詳細",
  description: "テニス記事の詳細ページ"
}

export default async function PostDetailPage({ params }: Props) {
  const { categoryId, postId } = params
  const catId = parseInt(categoryId, 10)
  const pId = parseInt(postId, 10)

  const post = await prisma.post.findUnique({
    where: { id: pId },
    include: {
      category: true,
      user: true,
    }
  })

  if (!post) notFound()

  // パンくず
  const breadcrumb = [
    { id: '', name: 'ライブラリ', href: '/library' },
    { id: categoryId, name: post.category?.name ?? "不明", href: `/library/${categoryId}` }
  ]

  // 関連記事取得
  const relatedPosts = await prisma.post.findMany({
    where: {
      categoryId: catId,
      NOT: { id: pId }
    },
    take: 3,
    select: { id: true, title: true, thumbnail: true }
  })

  return (
    <Box p={4} aria-label={`記事詳細:${post.title}`}>
      <Breadcrumb spacing="8px" separator=">">
        {breadcrumb.map((bc, i) => (
          <BreadcrumbItem key={bc.href} isCurrentPage={i === breadcrumb.length - 1}>
            <BreadcrumbLink as={NextLink} href={bc.href} aria-label={bc.name}>{bc.name}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>

      <Heading as="h1" size="lg" fontWeight="bold" mt={4} mb={4}>{post.title}</Heading>

      {post.thumbnail && (
        <Image src={post.thumbnail} alt={post.title} w="100%" h="auto" mb={4} borderRadius="md" />
      )}

      <Box dangerouslySetInnerHTML={{ __html: post.content }} mb={6} lineHeight="1.8" />

      <Text fontSize="sm" color="gray.500">投稿者: {post.user?.email ?? "不明"}</Text>
      <Text fontSize="sm" color="gray.500">投稿日: {post.created_at?.toLocaleDateString() || "不明"}</Text>

      {/* SNSシェアボタン */}
      <Box mt={4}>
        <Text fontSize="sm" mb={2}>シェアする:</Text>
        <Stack direction="row" spacing={2}>
          <ChakraLink
            href={`https://twitter.com/share?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + `/library/${categoryId}/${postId}`)}`}
            isExternal
            color="blue.500"
            _hover={{ textDecoration: "underline", bg: "gray.100" }}
            transition="background 0.3s"
          >
            Twitter
          </ChakraLink>
          <ChakraLink
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + `/library/${categoryId}/${postId}`)}`}
            isExternal
            color="blue.500"
            _hover={{ textDecoration: "underline", bg: "gray.100" }}
            transition="background 0.3s"
          >
            Facebook
          </ChakraLink>
        </Stack>
      </Box>

      {/* 関連記事 */}
      {relatedPosts.length > 0 && (
        <Box mt={8}>
          <Heading as="h2" size="md" mb={4}>関連記事</Heading>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            {relatedPosts.map(rp => (
              <Card
                as={NextLink}
                href={`/library/${categoryId}/${rp.id.toString()}`}
                key={rp.id.toString()}
                flex="1"
                _hover={{ bg: "gray.100" }}
                transition="background 0.3s"
                aria-label={`関連記事:${rp.title}`}
              >
                {rp.thumbnail && <Image src={rp.thumbnail} alt={rp.title} w="100%" h="150px" objectFit="cover" />}
                <CardHeader>
                  <Text fontWeight="bold">{rp.title}</Text>
                </CardHeader>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {/* フィードバックボタン */}
      {/* 実際にはこの部分はサーバーコンポーネント内ではなくクライアントコンポーネントでラップする必要があるため、
         下記のFeedbackButtonsはサーバー側ではなく、別コンポーネント化し、use client指定してください。
         ここでは簡略化のため同ファイル内に記載します。 */}
      <Box mt={8}>
        {/* Client Componentsでラップする必要があるため、実際にはこれを別ファイル化してください。 */}
        {/* ここではサンプルとしてJSXを直接配置します */}
        <FeedbackButtons postId={pId} />
      </Box>

      <Box mt={8}>
        <ChakraLink as={NextLink} href={`/library/${categoryId}`} color="blue.600" _hover={{ textDecoration: "underline" }}>
          ← カテゴリ一覧に戻る
        </ChakraLink>
      </Box>
    </Box>
  )
}