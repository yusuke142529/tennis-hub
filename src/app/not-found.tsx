// src/app/not-found.tsx
'use client'

import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <Box maxW="600px" mx="auto" mt="50px" p={8} borderWidth="1px" borderRadius="lg" boxShadow="sm" bg="white" textAlign="center">
      <Heading mb="4" size="lg" color="brand.500">Page Not Found</Heading>
      <Text mb="6" fontSize="md" color="gray.700">
        The page you are looking for does not exist. It may have been removed or is temporarily unavailable.
      </Text>
      <Button 
        onClick={() => router.push('/')}
        colorScheme="brand"
      >
        Go to Homepage
      </Button>
    </Box>
  )
}