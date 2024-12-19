// src/app/(auth)/verify-email/[token]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Box, Text, useToast, Center, Spinner } from '@chakra-ui/react'

export default function VerifyEmailPage() {
  const [message, setMessage] = useState('Verifying...')
  const router = useRouter()
  const params = useParams()
  const token = params.token as string
  const toast = useToast()

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/verify-email/${token}`)
      if (res.ok) {
        toast({
          title: "Email Verified",
          description: "You can now sign in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        setMessage('Email Verified! Redirecting to sign in...')
        setTimeout(() => router.push('/signin'), 2000)
      } else {
        const err = await res.json()
        toast({
          title: "Verification failed",
          description: err.error || "Please try again or contact support.",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
        setMessage(`Verification failed: ${err.error}`)
      }
    })()
  }, [token, router, toast])

  return (
    <Center minH="50vh" flexDirection="column" aria-live="polite" textAlign="center">
      <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" mb={4} />
      <Text fontSize="lg">{message}</Text>
    </Center>
  )
}