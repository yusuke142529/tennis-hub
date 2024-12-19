// src/app/(auth)/logout/page.tsx
'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { Center, Spinner, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      await signOut({ callbackUrl: '/' })
      toast({
        title: "Logged out",
        description: "You have been signed out successfully.",
        status: "info",
        duration: 3000,
        isClosable: true,
      })
      setTimeout(() => router.push('/'), 2000)
    })()
  }, [toast, router])

  return (
    <Center minH="50vh" flexDirection="column" aria-busy="true" textAlign="center">
      <Spinner size="xl" color="brand.500" mb={4} />
      <Text fontSize="lg">Logging out...</Text>
    </Center>
  )
}