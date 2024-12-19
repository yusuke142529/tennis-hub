// src/app/admin/ClientLayout.tsx
"use client"

import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import AdminSidebar from "@/components/AdminSidebar"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const bgColor = useColorModeValue("gray.50", "gray.900")

    return (
        <Flex minH="100vh" bg={bgColor}>
            <AdminSidebar />
            <Box flex="1" p="4">
                {children}
            </Box>
        </Flex>
    )
}