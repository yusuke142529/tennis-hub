"use client"

import NextLink from "next/link"
import {
    Box,
    Text,
    Link as ChakraLink,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    useColorModeValue,
    Input,
    InputGroup,
    InputLeftElement,
    IconButton,
    Flex,
    FormControl,
    Spinner,
    Button,
    Heading
} from "@chakra-ui/react"
import { ChevronRightIcon, SearchIcon, StarIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"

type Category = { id: number | string, name: string }
type Article = { id: number | string, title: string, thumbnail?: string, summary: string, count?: number }

type CategoriesViewProps = {
    categories: Category[],
    breadcrumb: { id: string | number, name: string }[],
    selectedCategoryId?: string
}

export default function CategoriesView({ categories, breadcrumb, selectedCategoryId }: CategoriesViewProps) {
    const [searchKeyword, setSearchKeyword] = useState("")
    const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories)
    const [subCategories, setSubCategories] = useState<Category[] | null>(null)
    const [articles, setArticles] = useState<Article[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [hits, setHits] = useState<number | null>(null) // ヒット件数デモ用

    const bg = useColorModeValue("white", "gray.700")
    const borderColor = useColorModeValue("gray.200", "gray.600")

    // ローカルストレージから検索状態復元
    useEffect(() => {
        const savedKeyword = localStorage.getItem('library_search_keyword')
        if (savedKeyword) {
            setSearchKeyword(savedKeyword)
        }
    }, [])

    // 検索キーワード変更時にローカルストレージ保存
    useEffect(() => {
        localStorage.setItem('library_search_keyword', searchKeyword)
    }, [searchKeyword])

    useEffect(() => {
        if (!searchKeyword) {
            setFilteredCategories(categories)
        } else {
            setFilteredCategories(categories.filter(cat =>
                cat.name.toLowerCase().includes(searchKeyword.toLowerCase())
            ))
        }
    }, [searchKeyword, categories])

    // 下位カテゴリや記事の取得例（ダミーAPIコール）
    async function loadSubCategoriesAndArticles(categoryId: string | number) {
        setLoading(true)
        try {
            const subRes = await fetch(`/api/categories?parentId=${categoryId}`)
            const subData = await subRes.json()
            setSubCategories(subData.data)

            if (subData.data.length === 0) {
                // 最終階層カテゴリであれば記事取得
                const articleRes = await fetch(`/api/posts?categoryId=${categoryId}&page=${page}`)
                const articleData = await articleRes.json()
                setArticles(articleData.data)
                // 記事件数を返していると仮定
                if (articleData.count !== undefined) {
                    setHits(articleData.count)
                }
            } else {
                setArticles(null)
                setHits(null)
            }
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (selectedCategoryId) {
            loadSubCategoriesAndArticles(selectedCategoryId)
        }
    }, [selectedCategoryId, page])

    return (
        <Box aria-label="カテゴリビュー">
            {/* パンくずリスト */}
            <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb={4} aria-label="パンくずリスト">
                <BreadcrumbItem>
                    <BreadcrumbLink as={NextLink} href="/library" aria-label="ライブラリトップ">トップ</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumb.map((crumb, idx) => (
                    <BreadcrumbItem key={crumb.id} isCurrentPage={idx === breadcrumb.length - 1}>
                        <BreadcrumbLink as={NextLink} href={`/library/${crumb.id}`} aria-label={crumb.name}>{crumb.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>

            {/* 検索・カテゴリフィルタUI (上位階層のみ) */}
            {(!articles && !selectedCategoryId) && (
                <Flex mb={4} gap={2} align="center" wrap="wrap">
                    <FormControl maxW="200px" aria-label="カテゴリ検索フォーム">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon color="gray.300" />
                            </InputLeftElement>
                            <Input
                                placeholder="カテゴリ検索"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                aria-label="カテゴリ検索キーワード入力"
                            />
                        </InputGroup>
                    </FormControl>
                </Flex>
            )}

            {loading && (
                <Box textAlign="center" py={8}>
                    <Spinner size="lg" />
                </Box>
            )}

            {/* 下位カテゴリ表示 */}
            {!loading && subCategories && subCategories.length > 0 && (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                    {subCategories.map(cat => (
                        <Card
                            as={NextLink}
                            href={`/library/${cat.id}`}
                            key={cat.id}
                            borderWidth="1px"
                            borderColor={borderColor}
                            borderRadius="md"
                            p={4}
                            _hover={{ bg: "blue.50", textDecoration: "none" }}
                            transition="background 0.3s"
                            aria-label={`カテゴリ:${cat.name}`}
                        >
                            <CardHeader p={0} mb={2}>
                                <Text fontWeight="bold">{cat.name}</Text>
                            </CardHeader>
                            <CardBody p={0}>
                                <Text color="gray.500" fontSize="sm">このカテゴリ内の記事・下位カテゴリへ</Text>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            )}

            {/* トップレベルカテゴリ一覧（選択なしの場合） */}
            {!selectedCategoryId && !loading && !articles && (
                <>
                    {filteredCategories.length > 0 ? (
                        <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4}>
                            {filteredCategories.map(cat => (
                                <Card
                                    as={NextLink}
                                    href={`/library/${cat.id}`}
                                    key={cat.id}
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                    borderRadius="md"
                                    p={4}
                                    _hover={{ bg: "blue.50", textDecoration: "none" }}
                                    transition="background 0.3s"
                                    aria-label={`カテゴリ:${cat.name}`}
                                >
                                    <CardHeader p={0} mb={2}>
                                        <Text fontWeight="bold">{cat.name}</Text>
                                    </CardHeader>
                                    <CardBody p={0}>
                                        <Text color="gray.500" fontSize="sm">カテゴリ内の記事や子カテゴリを表示</Text>
                                    </CardBody>
                                </Card>
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Text color="gray.500" mt={4}>該当するカテゴリがありません。</Text>
                    )}
                </>
            )}

            {/* 記事一覧表示（最下層カテゴリ選択時） */}
            {!loading && articles && (
                <Box mt={8}>
                    <Heading as="h2" size="md" mb={4}>記事一覧</Heading>
                    {/* ヒット件数インジケータ例（APIが対応している場合） */}
                    {hits !== null && (
                        <Text fontSize="sm" mb={2}>該当記事数: {hits}件</Text>
                    )}
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                        {articles.map(article => (
                            <Card
                                as={NextLink}
                                href={`/library/${selectedCategoryId}/${article.id}`}
                                key={article.id}
                                borderWidth="1px"
                                borderColor={borderColor}
                                borderRadius="md"
                                overflow="hidden"
                                _hover={{ bg: "blue.50", textDecoration: "none" }}
                                transition="background 0.3s"
                                aria-label={`記事:${article.title}`}
                            >
                                {article.thumbnail && (
                                    <Box bg="gray.100" h="150px" backgroundImage={`url(${article.thumbnail})`} backgroundSize="cover" backgroundPosition="center" />
                                )}
                                <CardHeader p={4} pb={2}>
                                    <Text fontWeight="bold">{article.title}</Text>
                                </CardHeader>
                                <CardBody p={4} pt={2}>
                                    <Text fontSize="sm" color="gray.600">{article.summary}</Text>
                                    {/* お気に入りボタン(ログイン判定は別途行う) */}
                                    <IconButton
                                        aria-label="お気に入りに追加"
                                        icon={<StarIcon />}
                                        size="sm"
                                        variant="ghost"
                                        colorScheme="yellow"
                                        mt={2}
                                    />
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>

                    {/* ページネーションコントロール例 */}
                    <Flex mt={4} justify="center" gap={2}>
                        <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}>前へ</Button>
                        <Button onClick={() => setPage(p => p + 1)}>次へ</Button>
                    </Flex>
                </Box>
            )}
        </Box>
    )
}