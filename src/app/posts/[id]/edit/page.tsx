// src/app/posts/[id]/edit/page.tsx
'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema } from '@/lib/zodSchemas'
import { useEffect, useState } from 'react'
import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button, FormErrorMessage, Spinner, Center, useToast, VStack } from '@chakra-ui/react'

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(postSchema)
  })
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/posts/${params.id}`)
      if (res.ok) {
        const post = await res.json()
        reset({ title: post.title, content: post.content })
      }
      setLoading(false)
    })()
  }, [params.id, reset])

  if (loading) return (
    <Center minH="50vh" flexDirection="column">
      <Spinner size="xl" color="brand.500" mb={4} />
      <div>Loading...</div>
    </Center>
  )

  async function onSubmit(data: any) {
    const res = await fetch(`/api/posts/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (res.ok) {
      toast({
        title: "Post updated",
        description: "Your post was successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setTimeout(() => router.push('/posts'), 1500)
    } else {
      const err = await res.json()
      toast({
        title: "Failed to update post",
        description: err.error || "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box maxW="600px" mx="auto" mt="10" p={8} borderWidth="1px" borderRadius="lg" boxShadow="sm" bg="white">
      <Heading mb="4" size="lg" textAlign="center">Edit Post</Heading>
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

          <Button type="submit" colorScheme="brand">Update</Button>
        </VStack>
      </form>
    </Box>
  )
}