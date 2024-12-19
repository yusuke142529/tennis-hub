import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Box, Heading, Link as ChakraLink, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text, SimpleGrid, Card, CardHeader, CardBody, Image } from "@chakra-ui/react"
import NextLink from "next/link"

type Props = {
    params: { categoryId: string }
}

export const metadata = {
  title: "カテゴリ一覧",
  description: "テニスライブラリのカテゴリページ"
}

export default async function CategoryPage({ params }: Props) {
    const categoryId = params.categoryId
    const catId = parseInt(categoryId, 10)

    const category = await prisma.category.findUnique({
        where: { id: catId },
        include: {
            children: true
        }
    })

    if (!category) notFound()

    const posts = await prisma.post.findMany({
        where: { categoryId: catId },
        select: { id: true, title: true, thumbnail: true, created_at: true }
    })

    const breadcrumb = [
      { id: '', name: 'ライブラリ', href: '/library' },
      { id: categoryId, name: category.name, href: `/library/${categoryId}` }
    ]

    return (
        <Box p={4} aria-label={`${category.name}カテゴリページ`}>
            <Breadcrumb spacing="8px" separator=">">
              {breadcrumb.map((bc, i) => (
                <BreadcrumbItem key={bc.href} isCurrentPage={i === breadcrumb.length - 1}>
                  <BreadcrumbLink as={NextLink} href={bc.href} aria-label={bc.name}>
                    {bc.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>

            <Heading as="h1" size="lg" fontWeight="bold" mt={4} mb={4} aria-label={`カテゴリ:${category.name}`}>
              {category.name}
            </Heading>

            <ChakraLink as={NextLink} href="/library" fontSize="sm" color="blue.600" _hover={{ textDecoration: "underline" }}>
                ← ライブラリトップへ戻る
            </ChakraLink>

            {category.children.length > 0 && (
                <Box mb={6} mt={4}>
                    <Heading as="h2" size="md" mb={2}>下位カテゴリ</Heading>
                    <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4}>
                        {category.children.map(child => (
                            <Card
                              as={NextLink}
                              href={`/library/${child.id.toString()}`}
                              key={child.id.toString()}
                              borderWidth="1px"
                              borderRadius="md"
                              overflow="hidden"
                              transition="background 0.3s"
                              _hover={{ bg: "gray.100" }}
                              aria-label={`下位カテゴリ:${child.name}`}
                            >
                              <CardHeader p={4}>
                                <Text fontWeight="bold">{child.name}</Text>
                              </CardHeader>
                              <CardBody p={4} pt={0}>
                                <Text fontSize="sm" color="gray.600">
                                  このカテゴリ内の記事や下位カテゴリを表示
                                </Text>
                              </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>
                </Box>
            )}

            {posts.length > 0 && (
                <Box mt={6}>
                    <Heading as="h2" size="md" mb={4}>記事一覧</Heading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                        {posts.map(post => (
                            <Card
                              as={NextLink}
                              href={`/library/${categoryId}/${post.id.toString()}`}
                              key={post.id.toString()}
                              borderWidth="1px"
                              borderRadius="md"
                              overflow="hidden"
                              transition="background 0.3s"
                              _hover={{ bg: "blue.50", textDecoration: "none" }}
                              aria-label={`記事:${post.title}`}
                            >
                              {post.thumbnail && (
                                <Image src={post.thumbnail} alt={post.title} w="100%" h="150px" objectFit="cover" />
                              )}
                              <CardHeader p={4}>
                                <Text fontWeight="bold">{post.title}</Text>
                                <Text fontSize="sm" color="gray.500">{post.created_at?.toLocaleDateString() || "不明"}</Text>
                              </CardHeader>
                            </Card>
                        ))}
                    </SimpleGrid>
                </Box>
            )}

            {category.children.length === 0 && posts.length === 0 && (
                <Box mt={8}>
                    <Text color="gray.500">このカテゴリには記事や下位カテゴリがありません。</Text>
                </Box>
            )}
        </Box>
    )
}