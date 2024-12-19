// src/app/(auth)/reset-password/[token]/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, FormControl, FormLabel, Input, Button, FormErrorMessage, Heading, useToast, Text, VStack } from '@chakra-ui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters")
})

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const [msg, setMsg] = useState('')
  const router = useRouter()
  const toast = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(resetPasswordSchema)
  })

  async function onSubmit(data: any) {
    const res = await fetch(`/api/reset-password/${params.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: data.password })
    })
    const json = await res.json()
    if (res.ok) {
      toast({
        title: "Password reset successful",
        description: "You can now sign in with your new password.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setMsg('Password reset successful.')
      setTimeout(() => router.push('/signin'), 2000)
    } else {
      toast({
        title: "Error resetting password",
        description: json.error || "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setMsg(`Error: ${json.error}`)
    }
  }

  return (
    <Box maxW="md" mx="auto" mt="10" p={8} borderWidth="1px" borderRadius="lg" boxShadow="sm" bg="white">
      <Heading mb="4" size="lg" textAlign="center">Reset Password</Heading>
      {msg && (
        <Text mb={4} fontSize="sm" color="gray.700" aria-live="polite">
          {msg}
        </Text>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>New Password</FormLabel>
            <Input 
              type="password" 
              {...register('password')} 
              placeholder="At least 8 characters"
              focusBorderColor="brand.500"
            />
            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
          </FormControl>

          <Button type="submit" colorScheme="brand">Reset Password</Button>
        </VStack>
      </form>
    </Box>
  )
}