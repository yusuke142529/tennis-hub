// src/components/ProtectedRoute.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { Center, Spinner, Text, VStack } from '@chakra-ui/react'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <Center minH="50vh" flexDirection="column" aria-busy="true" aria-live="polite">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" mb={4} />
        <Text fontSize="lg">Checking your session, please wait...</Text>
      </Center>
    )
  }

  return <>{children}</>
}