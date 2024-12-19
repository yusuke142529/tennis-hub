// src/app/(auth)/forgot-password/page.tsx
'use client'

import { useState } from 'react'
import { Box, FormControl, FormLabel, Input, Button, FormErrorMessage, Heading, useToast, Text, VStack } from '@chakra-ui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email")
})

export default function ForgotPasswordPage() {
  const [msg, setMsg] = useState('')
  const toast = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  })

  async function onSubmit(data: any) {
    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email })
    })
    const json = await res.json()
    if (res.ok) {
      toast({
        title: "Check your email",
        description: "We have sent a password reset link to your email address.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setMsg('Check your email for reset link.')
    } else {
      toast({
        title: "Request failed",
        description: json.error || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setMsg(`Error: ${json.error}`)
    }
  }

  return (
    <Box maxW="md" mx="auto" mt="10" p={8} borderWidth="1px" borderRadius="lg" boxShadow="sm" bg="white">
      <Heading mb="4" size="lg" textAlign="center">Forgot Password</Heading>
      {msg && (
        <Text mb={4} fontSize="sm" color="gray.700" aria-live="polite">
          {msg}
        </Text>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input 
              {...register('email')}
              placeholder="you@example.com"
              type="email"
              focusBorderColor="brand.500"
            />
            {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
          </FormControl>

          <Button type="submit" colorScheme="brand">Send Reset Email</Button>
        </VStack>
      </form>
    </Box>
  )
}