// src/app/(auth)/signin/page.tsx
'use client'

import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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
import Link from 'next/link'

const signinSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export default function SigninPage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signinSchema)
    })
    const router = useRouter()
    const toast = useToast()

    async function onSubmit(data: any) {
        const res = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        })
        if (res && !res.error) {
            toast({
              title: "Sign in successful!",
              description: "Redirecting to your profile...",
              status: "success",
              duration: 3000,
              isClosable: true,
            })
            setTimeout(() => router.push('/profile'), 2000)
        } else {
            toast({
              title: "Sign in failed",
              description: res?.error || "Invalid email or password",
              status: "error",
              duration: 3000,
              isClosable: true,
            })
        }
    }

    return (
        <Box maxW="md" mx="auto" mt="10" p={8} borderWidth="1px" borderRadius="lg" boxShadow="sm" bg="white">
            <Heading mb="4" size="lg" textAlign="center">Sign In</Heading>
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
                      placeholder="Enter your password" 
                      focusBorderColor="brand.500"
                    />
                    {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                  </FormControl>

                  <Button type="submit" colorScheme="brand">Sign In</Button>
                </VStack>
            </form>
            <Text mt={4} fontSize="sm" textAlign="center">
              Don't have an account?{" "}
              <ChakraLink as={Link} href="/signup" color="brand.500" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>
                Sign Up
              </ChakraLink>
            </Text>
            <Text mt={2} fontSize="sm" textAlign="center">
              Forgot your password?{" "}
              <ChakraLink as={Link} href="/forgot-password" color="brand.500" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>
                Reset Here
              </ChakraLink>
            </Text>
        </Box>
    )
}