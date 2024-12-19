// src/app/admin/AdminDashboardClient.tsx
"use client"

import NextLink from "next/link"
import { FaSignOutAlt } from "react-icons/fa"
import { MdDashboard } from "react-icons/md"
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Icon,
    Link as ChakraLink,
    Grid,
    useColorModeValue,
    VStack,
    HStack
} from "@chakra-ui/react"

export default function AdminDashboardClient({ session }: { session: any }) {
    const avatarUrl = "https://via.placeholder.com/40"

    // 以下はすべてクライアントコンポーネント内で使用可能
    const headerBg = useColorModeValue("whiteAlpha.800", "gray.800")
    const headerBorder = useColorModeValue("gray.200", "gray.700")
    const mainBg = useColorModeValue("gray.50", "gray.900")
    const textColor = useColorModeValue("gray.800", "gray.100")
    const secondaryTextColor = useColorModeValue("gray.600", "gray.300")
    const cardBg = useColorModeValue("white", "gray.800")
    const cardTextColor = useColorModeValue("gray.700", "gray.200")
    const linkHoverColor = useColorModeValue("blue.600", "blue.400")
    const statsNumberColor = useColorModeValue("blue.600", "blue.400")

    return (
        <Flex direction="column" minH="100vh" bg={mainBg} color={textColor}>
            {/* トップバー */}
            <Flex
                as="header"
                align="center"
                justify="space-between"
                px={6}
                py={3}
                bg={headerBg}
                borderBottomWidth="1px"
                borderColor={headerBorder}
                position="sticky"
                top={0}
                zIndex={20}
                backdropFilter="blur(8px)"
            >
                <HStack spacing={2}>
                    <ChakraLink
                        as={NextLink}
                        href="/admin"
                        display="flex"
                        alignItems="center"
                        _hover={{ color: linkHoverColor }}
                        fontWeight="semibold"
                        fontSize="2xl"
                    >
                        <Icon as={MdDashboard} boxSize={6} mr={1} />
                        <Text>Admin</Text>
                    </ChakraLink>
                </HStack>
                <HStack spacing={4}>
                    <Box display={{ base: "none", sm: "flex" }} flexDir="column" textAlign="right">
                        <Text fontWeight="medium" fontSize="sm" color={cardTextColor}>
                            管理者: {session.user.email}
                        </Text>
                        <Text fontSize="xs" color={secondaryTextColor}>
                            Role: Admin
                        </Text>
                    </Box>
                    <Image
                        src={avatarUrl}
                        alt="User Avatar"
                        boxSize="40px"
                        borderRadius="full"
                        objectFit="cover"
                        border="2px solid"
                        borderColor="blue.500"
                    />
                    <ChakraLink
                        as={NextLink}
                        href="/api/auth/signout"
                        display="flex"
                        alignItems="center"
                        color="gray.600"
                        _hover={{ color: "red.600" }}
                    >
                        <Icon as={FaSignOutAlt} />
                        <Text ml={1} display={{ base: "none", sm: "inline-block" }}>
                            ログアウト
                        </Text>
                    </ChakraLink>
                </HStack>
            </Flex>

            <Flex flex="1" overflow="hidden">
                {/* layout.tsxでサイドバーは表示済 */}

                <Box flex="1" p={6} overflowY="auto">
                    {/* ページヘッダ */}
                    <Box mb={6}>
                        <Heading as="h1" size="xl" mb={2} fontWeight="extrabold">
                            ダッシュボード
                        </Heading>
                        <Text fontSize="sm" color={secondaryTextColor}>
                            サイト記事やカテゴリを効率的に管理できます。
                        </Text>
                    </Box>

                    {/* ダッシュボード統計エリア */}
                    <Grid templateColumns={{ base: "1fr", sm: "repeat(2,1fr)", lg: "repeat(3,1fr)" }} gap={6}>
                        <Box
                            bg={cardBg}
                            borderRadius="lg"
                            shadow="md"
                            p={4}
                            _hover={{ shadow: "lg" }}
                            transition="all 0.3s"
                        >
                            <Heading as="h2" size="md" color={cardTextColor} mb={1}>
                                総記事数
                            </Heading>
                            <Text fontSize="4xl" fontWeight="extrabold" color={statsNumberColor}>
                                123
                            </Text>
                            <Text fontSize="sm" color={secondaryTextColor} mt={2}>
                                今月は+10記事増加
                            </Text>
                        </Box>

                        <Box
                            bg={cardBg}
                            borderRadius="lg"
                            shadow="md"
                            p={4}
                            _hover={{ shadow: "lg" }}
                            transition="all 0.3s"
                        >
                            <Heading as="h2" size="md" color={cardTextColor} mb={1}>
                                総カテゴリ数
                            </Heading>
                            <Text fontSize="4xl" fontWeight="extrabold" color={statsNumberColor}>
                                12
                            </Text>
                            <Text fontSize="sm" color={secondaryTextColor} mt={2}>
                                今月は+2カテゴリ増加
                            </Text>
                        </Box>

                        <Box
                            bg={cardBg}
                            borderRadius="lg"
                            shadow="md"
                            p={4}
                            _hover={{ shadow: "lg" }}
                            transition="all 0.3s"
                        >
                            <Heading as="h2" size="md" color={cardTextColor} mb={1}>
                                レビュー待ち記事
                            </Heading>
                            <Text fontSize="4xl" fontWeight="extrabold" color={statsNumberColor}>
                                5
                            </Text>
                            <Text fontSize="sm" color={secondaryTextColor} mt={2}>
                                最新の更新: 3時間前
                            </Text>
                        </Box>
                    </Grid>

                    <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6} mt={8}>
                        <Box
                            bg={cardBg}
                            borderRadius="lg"
                            shadow="md"
                            p={4}
                            _hover={{ shadow: "lg" }}
                            transition="all 0.3s"
                        >
                            <Heading as="h3" size="md" color={cardTextColor} mb={4}>
                                コンテンツパフォーマンス
                            </Heading>
                            <Flex align="center" justify="center" h="40">
                                <Text fontSize="sm" color={secondaryTextColor}>
                                    グラフ・チャート（後で実装）
                                </Text>
                            </Flex>
                        </Box>
                        <Box
                            bg={cardBg}
                            borderRadius="lg"
                            shadow="md"
                            p={4}
                            _hover={{ shadow: "lg" }}
                            transition="all 0.3s"
                        >
                            <Heading as="h3" size="md" color={cardTextColor} mb={4}>
                                最近のアクティビティ
                            </Heading>
                            <VStack align="start" spacing={2} fontSize="sm" color={cardTextColor}>
                                <Text>・記事「xxxx」を編集 (2時間前)</Text>
                                <Text>・カテゴリ「yyyy」を追加 (昨日)</Text>
                                <Text>・記事「zzzz」をレビュー待ちに設定 (3日前)</Text>
                            </VStack>
                        </Box>
                    </Grid>

                    {/* 小画面用の簡易アクセスリンク */}
                    <Box mt={8} display={{ md: "none" }}>
                        <Heading as="h2" size="md" color={cardTextColor} mb={2}>
                            管理ページへ
                        </Heading>
                        <VStack align="start" spacing={2}>
                            <ChakraLink
                                as={NextLink}
                                href="/admin/posts"
                                color="blue.600"
                                _hover={{ textDecoration: "underline", color: "blue.500" }}
                            >
                                記事管理ページへ
                            </ChakraLink>
                            <ChakraLink
                                as={NextLink}
                                href="/admin/categories"
                                color="blue.600"
                                _hover={{ textDecoration: "underline", color: "blue.500" }}
                            >
                                カテゴリ管理ページへ
                            </ChakraLink>
                        </VStack>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    )
}