// src/app/posts/page.tsx
'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { Box, Heading, Link as ChakraLink, Text, Spinner, Center, useColorModeValue, VStack, Button } from '@chakra-ui/react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function PostsPage() {
  const { data: posts, error } = useSWR('/api/posts', fetcher)
  const bg = useColorModeValue('white', 'gray.800')

  if (error) return (
    <Center minH="50vh">
      <Text color="red.500">Failed to load posts</Text>
    </Center>
  )

  if (!posts) return (
    <Center minH="50vh" flexDirection="column">
      <Spinner size="xl" color="brand.500" mb={4} />
      <Text fontSize="lg">Loading...</Text>
    </Center>
  )

  return (
    <Box maxW="600px" mx="auto" mt="10" p={4} bg={bg} borderRadius="md" boxShadow="sm">
      <Heading mb="4" size="lg" textAlign="center">Posts</Heading>
      <Button as={Link} href="/posts/new" colorScheme="brand" mb={6}>Create New Post</Button>
      <VStack spacing={4} align="stretch">
        {posts.map((p: any) => (
          <Box key={p.id} p={4} borderWidth="1px" borderRadius="md" boxShadow="xs">
            <ChakraLink as={Link} href={`/posts/${p.id}`} fontSize="md" fontWeight="semibold" color="brand.500" _hover={{ textDecoration: 'underline' }}>
              {p.title}
            </ChakraLink>
            <Text fontSize="sm" color="gray.600">by {p.user.email}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}