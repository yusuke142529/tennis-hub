"use client";

import { Box, Flex, Icon, Link as ChakraLink, Text, useColorModeValue, Tooltip } from "@chakra-ui/react"
import { MdDashboard, MdArticle, MdCategory, MdInsights } from "react-icons/md"
import NextLink from "next/link"
import { useState } from "react"

export default function AdminSidebar() {
  const bg = useColorModeValue("gray.100", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const linkColor = useColorModeValue("blue.600", "blue.300")
  const hoverBg = useColorModeValue("gray.200", "gray.700")

  // サイドバーを折りたたむための状態管理
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { href: "/admin", label: "ダッシュボード", icon: MdDashboard },
    { href: "/admin/posts", label: "記事管理", icon: MdArticle },
    { href: "/admin/categories", label: "カテゴリ管理", icon: MdCategory },
    { href: "/admin/stats", label: "アクセス統計", icon: MdInsights },
  ]

  return (
    <Flex
      as="nav"
      direction="column"
      bg={bg}
      borderRightWidth="1px"
      borderColor={borderColor}
      p={4}
      w={collapsed ? "64px" : "240px"}
      transition="width 0.3s ease"
      overflow="hidden"
      aria-label="Admin Sidebar"
    >
      <Flex align="center" justify={collapsed ? "center" : "space-between"} mb={6}>
        {!collapsed && (
          <Text fontSize="lg" fontWeight="bold" color={useColorModeValue("gray.800", "white")}>
            Admin Menu
          </Text>
        )}
        <Box
          as="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          ml={collapsed ? 0 : 2}
          p={2}
          borderRadius="md"
          _hover={{ bg: hoverBg }}
        >
          <Text fontSize="sm" fontWeight="bold">
            {collapsed ? ">" : "<"}
          </Text>
        </Box>
      </Flex>

      <Box as="ul" listStyleType="none" m={0} p={0} flex="1">
        {menuItems.map((item) => (
          <Box as="li" key={item.href} mb={2}>
            <Tooltip label={collapsed ? item.label : ""} placement="right">
              <ChakraLink
                as={NextLink}
                href={item.href}
                display="flex"
                alignItems="center"
                p={2}
                borderRadius="md"
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  bg: hoverBg,
                }}
                _focus={{ boxShadow: "outline" }}
              >
                <Icon as={item.icon} boxSize={5} mr={collapsed ? 0 : 3} />
                {!collapsed && <Text fontWeight="medium">{item.label}</Text>}
              </ChakraLink>
            </Tooltip>
          </Box>
        ))}
      </Box>
    </Flex>
  )
}