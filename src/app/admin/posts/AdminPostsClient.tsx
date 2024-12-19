// src/app/admin/posts/AdminPostsClient.tsx
"use client"

import NextLink from "next/link"
import { useColorModeValue, Box, Heading, Flex, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Link as ChakraLink } from "@chakra-ui/react"
import { useState } from "react"
import { SearchIcon } from "@chakra-ui/icons"
import { useRouter } from 'next/navigation'

type Post = {
  id: number,
  title: string,
  updatedAt: Date,
  category?: { name: string }
}

export default function AdminPostsClient({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState("")
  const router = useRouter()
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  const bg = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      alert('削除しました')
      router.refresh()
    } else {
      alert('削除に失敗しました')
    }
  }

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4} fontWeight="bold">
        記事管理
      </Heading>

      <Flex mb={4} justify="space-between" align="center">
        <Flex align="center" gap={2}>
          <Input
            placeholder="検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            borderColor={borderColor}
            bg={bg}
            _focus={{ borderColor: "blue.400" }}
            aria-label="記事検索"
            maxW="200px"
          />
          <Button leftIcon={<SearchIcon />} variant="outline" borderColor={borderColor}>
            検索
          </Button>
        </Flex>
        <Flex align="center" gap={2}>
          <Button
            as={NextLink}
            href="/admin/posts/new"
            colorScheme="blue"
            variant="solid"
          >
            新規記事投稿
          </Button>
        </Flex>
      </Flex>

      <Box border="1px" borderColor={borderColor} borderRadius="md" overflowX="auto" mb={4}>
        <Table variant="striped" colorScheme="gray" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>タイトル</Th>
              <Th>カテゴリ</Th>
              <Th>更新日時</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredPosts.map((post) => (
              <Tr key={post.id}>
                <Td>{post.id}</Td>
                <Td>{post.title}</Td>
                <Td>{post.category?.name ?? "未分類"}</Td>
                <Td>{new Date(post.updatedAt).toLocaleDateString()}</Td>
                <Td>
                  <ChakraLink
                    as={NextLink}
                    href={`/admin/posts/${post.id}/edit`}
                    color="blue.600"
                    _hover={{ textDecoration: "underline" }}
                    mr={3}
                  >
                    編集
                  </ChakraLink>
                  <Button
                    variant="link"
                    color="red.600"
                    _hover={{ textDecoration: "underline" }}
                    aria-label={`記事ID${post.id}を削除`}
                    onClick={() => handleDelete(post.id)}
                  >
                    削除
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Button onClick={() => router.push("/admin/posts")} variant="outline">
        記事管理へ戻る
      </Button>
    </Box>
  )
}