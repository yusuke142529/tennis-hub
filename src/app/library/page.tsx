// src/app/library/page.tsx
import { Suspense } from "react"
import CategoriesView from "@/components/library/CategoriesView"
import { Heading, Box, Spinner, Text } from "@chakra-ui/react"
import prisma from "@/lib/prisma"

export const metadata = {
  title: "テニスライブラリ",
  description: "管理者が投稿した記事をカテゴリ階層で探せるテニスライブラリ"
}

export default async function LibraryPage() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    orderBy: { id: 'asc' }
  })

  return (
    <Box p={4} aria-label="テニスライブラリページ">
      <Heading as="h1" size="lg" mb={4} fontWeight="bold" aria-label="テニスライブラリトップ">テニスライブラリ</Heading>
      <Suspense fallback={<Spinner />}>
        {categories.length > 0 ? (
          <CategoriesView categories={categories} breadcrumb={[]} />
        ) : (
          <Text>表示できるカテゴリがありません。</Text>
        )}
      </Suspense>
    </Box>
  )
}