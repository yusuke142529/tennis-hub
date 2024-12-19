// src/app/error.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Box, Heading, Text, VStack, useToast } from '@chakra-ui/react'

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    console.error("Error caught by error.tsx:", error)
    toast({
      title: "An unexpected error occurred",
      description: error.message || "Please try again or return to the homepage.",
      status: "error",
      duration: 4000,
      isClosable: true,
    })
  }, [error, toast])

  return (
    <Box maxW="600px" mx="auto" mt="50px" p={8} borderWidth="1px" borderRadius="lg" boxShadow="sm" bg="white">
      <Heading mb="4" size="lg" textAlign="center" color="red.600">Something went wrong</Heading>
      <Text mb="6" fontSize="md" color="gray.700" textAlign="center">
        We encountered an unexpected error. Please try again or go back to the homepage.
      </Text>
      <VStack spacing={4}>
        <Button 
          onClick={() => reset()}
          colorScheme="brand"
          variant="solid"
        >
          Try Again
        </Button>
        <Button
          onClick={() => router.push('/')}
          variant="outline"
          colorScheme="brand"
        >
          Go to Homepage
        </Button>
      </VStack>
    </Box>
  )
}