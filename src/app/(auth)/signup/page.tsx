// src/app/(auth)/signup/page.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Box, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  FormErrorMessage, 
  Heading,
  useToast,
  Text,
  Link as ChakraLink,
  VStack
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const signupSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export default function SignupPage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signupSchema)
    })
    const router = useRouter()
    const toast = useToast()

    async function onSubmit(data: any) {
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const json = await res.json()
        if (res.ok) {
            toast({
              title: "Account created",
              description: "Check your email for a verification link!",
              status: "success",
              duration: 3000,
              isClosable: true,
            })
            setTimeout(() => router.push('/signin'), 2000)
        } else {
            toast({
              title: "Signup failed",
              description: json.error || "Please try again",
              status: "error",
              duration: 3000,
              isClosable: true,
            })
        }
    }

    return (
        <Box maxW="md" mx="auto" mt="10" p={8} borderWidth="1px" borderRadius="lg" boxShadow="sm" bg="white">
            <Heading mb="4" size="lg" textAlign="center">Sign Up</Heading>
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

                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input 
                      type="password" 
                      {...register('password')} 
                      placeholder="At least 8 characters" 
                      focusBorderColor="brand.500"
                    />
                    {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                  </FormControl>

                  <Button type="submit" colorScheme="brand">Sign Up</Button>
                </VStack>
            </form>
            <Text mt={4} fontSize="sm" textAlign="center">
              Already have an account?{" "}
              <ChakraLink as={Link} href="/signin" color="brand.500" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>
                Sign In
              </ChakraLink>
            </Text>
        </Box>
    )
}