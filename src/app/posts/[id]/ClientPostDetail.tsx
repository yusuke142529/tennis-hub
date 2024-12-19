// src/app/posts/[id]/ClientPostDetail.tsx
'use client'

import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'

export default function ClientPostDetail({ post }: { post: any }) {
  const bg = useColorModeValue('white', 'gray.800')
  const markdownBg = useColorModeValue('gray.50', 'gray.700')

  return (
    <Box maxW="600px" mx="auto" mt="10" p={4} bg={bg} borderRadius="md" boxShadow="sm">
      <Heading mb="2" size="lg">{post.title}</Heading>
      <Text fontSize="sm" color="gray.500" mb={4}>by {post.user.email}</Text>
      <Box p={4} bg={markdownBg} borderRadius="md">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Box>
    </Box>
  )
}