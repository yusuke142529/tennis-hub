// src/app/ClientHome.tsx (クライアントコンポーネント)
"use client";

import Link from "next/link"
import { Box, Heading, Text, Button, useColorModeValue, VStack, HStack } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function ClientHome({ userEmail }: { userEmail: string | null }) {
    const bgGradient = useColorModeValue("linear(to-b, blue.50, white)", "linear(to-b, gray.900, gray.800)");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const highlightColor = useColorModeValue("blue.600", "blue.300");

    return (
        <Box
            minH="100vh"
            bgGradient={bgGradient}
            py={{ base: 16, md: 24 }}
            px={{ base: 4, md: 6 }}
        >
            <VStack
                maxW="3xl"
                mx="auto"
                spacing={8}
                textAlign="center"
                align="center"
            >
                <Heading as="h1" size="2xl" color={highlightColor} fontWeight="extrabold">
                    Welcome to Tennis HUB
                </Heading>
                <Text fontSize="lg" color={textColor} lineHeight="tall">
                    A community platform for tennis enthusiasts. Improve your skills, share insights,
                    and celebrate the sport we love.
                </Text>

                {userEmail ? (
                    <VStack spacing={4}>
                        <Text fontSize="md" color={textColor}>
                            Hi <Text as="span" fontWeight="bold" color={highlightColor}>{userEmail}</Text>,
                            dive into your profile or explore the latest posts.
                        </Text>
                        <HStack spacing={4}>
                            <Button
                                as={Link}
                                href="/profile"
                                colorScheme="blue"
                                borderRadius="full"
                                fontWeight="bold"
                                rightIcon={<ChevronRightIcon />}
                                _hover={{ transform: "scale(1.03)", boxShadow: "md" }}
                                _active={{ transform: "scale(0.98)" }}
                            >
                                Profile
                            </Button>
                            <Button
                                as={Link}
                                href="/posts"
                                colorScheme="teal"
                                borderRadius="full"
                                fontWeight="bold"
                                rightIcon={<ChevronRightIcon />}
                                _hover={{ transform: "scale(1.03)", boxShadow: "md" }}
                                _active={{ transform: "scale(0.98)" }}
                            >
                                Posts
                            </Button>
                        </HStack>
                    </VStack>
                ) : (
                    <VStack spacing={4}>
                        <Text fontSize="md" color={textColor}>
                            Join our community to share your experiences and learn from others.
                            Please sign in or sign up to start your journey.
                        </Text>
                        <HStack spacing={4}>
                            <Button
                                as={Link}
                                href="/signin"
                                colorScheme="green"
                                borderRadius="full"
                                fontWeight="bold"
                                rightIcon={<ChevronRightIcon />}
                                _hover={{ transform: "scale(1.03)", boxShadow: "md" }}
                                _active={{ transform: "scale(0.98)" }}
                            >
                                Sign In
                            </Button>
                            <Button
                                as={Link}
                                href="/signup"
                                colorScheme="blue"
                                variant="outline"
                                borderRadius="full"
                                fontWeight="bold"
                                rightIcon={<ChevronRightIcon />}
                                _hover={{ transform: "scale(1.03)", boxShadow: "md" }}
                                _active={{ transform: "scale(0.98)" }}
                            >
                                Sign Up
                            </Button>
                        </HStack>
                    </VStack>
                )}
            </VStack>
        </Box>
    )
}