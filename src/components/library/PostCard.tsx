"use client"

import { Box, Text, Card, CardHeader, CardBody, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { useState } from "react"

type PostCardProps = {
    id: number | string
    title: string
    thumbnail?: string
    summary?: string
    href: string
}

export default function PostCard({ id, title, thumbnail, summary, href }: PostCardProps) {
    const [hovered, setHovered] = useState(false)
    const borderColor = useColorModeValue("gray.200", "gray.600")

    return (
        <Card
            as={NextLink}
            href={href}
            key={id.toString()}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="md"
            overflow="hidden"
            _hover={{ bg: "blue.50", textDecoration: "none" }}
            transition="background 0.3s"
            aria-label={`記事:${title}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            position="relative"
        >
            {thumbnail && (
                <Box
                    bg="gray.100"
                    h="150px"
                    backgroundImage={`url(${thumbnail})`}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    aria-label={`${title}のサムネイル`}
                />
            )}
            <CardHeader p={4} pb={2}>
                <Text fontWeight="bold">{title}</Text>
            </CardHeader>
            <CardBody p={4} pt={2} aria-label="記事情報">
                <Box position="relative">
                    {hovered && summary && (
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            w="100%"
                            bg="white"
                            boxShadow="md"
                            p={2}
                            borderRadius="md"
                            zIndex={10}
                            transition="opacity 0.2s"
                            aria-label="記事概要表示"
                        >
                            <Text fontSize="sm" color="gray.700">{summary}</Text>
                        </Box>
                    )}
                </Box>
            </CardBody>
        </Card>
    )
}