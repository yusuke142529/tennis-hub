// src/app/posts/new/page.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema } from '@/lib/zodSchemas'
import { useRouter } from 'next/navigation'
import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button, FormErrorMessage, VStack, useToast } from '@chakra-ui/react'

export default function NewPostPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(postSchema)
  })
  const router = useRouter()
  const toast = useToast()

  async function onSubmit(data: any) {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(data)
    })
    if (res.ok) {
      toast({
        title: "Post created",
        description: "Your new post has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setTimeout(() => router.push('/posts'), 1500)
    } else {
      const err = await res.json()
      toast({
        title: "Failed to create post",
        description: err.error || "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box maxW="400px" mx="auto" mt="10" p={8} borderWidth="1px" borderRadius="lg" boxShadow="sm" bg="white">
      <Heading mb="4" size="lg" textAlign="center">New Post</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Title</FormLabel>
            <Input {...register('title')} placeholder="Enter post title" focusBorderColor="brand.500" />
            {errors.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.content}>
            <FormLabel>Content</FormLabel>
            <Textarea {...register('content')} placeholder="Enter post content" focusBorderColor="brand.500" />
            {errors.content && <FormErrorMessage>{errors.content.message}</FormErrorMessage>}
          </FormControl>

          <Button type="submit" colorScheme="brand">Create</Button>
        </VStack>
      </form>
    </Box>
  )
}