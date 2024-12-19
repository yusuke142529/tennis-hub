"use client"

import { Box, Text, FormControl, InputGroup, InputLeftElement, Input, Select, useColorModeValue } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"

type FilterPanelProps = {
    defaultCategoryId?: number | string
    defaultTag?: string
    onFilterChange: (filters: { keyword: string; tag?: string; categoryId?: number | string }) => void
    hitCount?: number
}

export default function FilterPanel({ defaultCategoryId, defaultTag, onFilterChange, hitCount }: FilterPanelProps) {
    const [keyword, setKeyword] = useState("")
    const [tag, setTag] = useState(defaultTag || "")
    const [categoryId, setCategoryId] = useState(defaultCategoryId || "")

    useEffect(() => {
        const savedFilters = localStorage.getItem('library_filters')
        if (savedFilters) {
            const parsed = JSON.parse(savedFilters)
            if (parsed.keyword) setKeyword(parsed.keyword)
            if (parsed.tag) setTag(parsed.tag)
            if (parsed.categoryId) setCategoryId(parsed.categoryId)
        }
    }, [])

    useEffect(() => {
        const filters = { keyword, tag, categoryId }
        localStorage.setItem('library_filters', JSON.stringify(filters))
        onFilterChange(filters)
    }, [keyword, tag, categoryId, onFilterChange])

    const borderColor = useColorModeValue("gray.200", "gray.600")

    return (
        <Box 
          borderWidth="1px" 
          borderColor={borderColor} 
          borderRadius="md" 
          p={4} 
          mb={4} 
          aria-label="フィルタパネル" 
          role="form"
        >
            <Text fontWeight="bold" mb={2}>フィルタ</Text>
            <FormControl mb={2}>
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                        placeholder="キーワードで検索"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        aria-label="キーワード入力"
                    />
                </InputGroup>
            </FormControl>

            <FormControl mb={2}>
                <Select
                    placeholder="タグで絞り込み"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    aria-label="タグフィルタ"
                >
                    <option value="technique">Technique</option>
                    <option value="history">History</option>
                    <option value="gear">Gear</option>
                </Select>
            </FormControl>

            <FormControl mb={2}>
                <Select
                    placeholder="カテゴリで絞り込み"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    aria-label="カテゴリフィルタ"
                >
                    {/* カテゴリ一覧はAPIから取得して動的に生成するのが理想 */}
                    <option value="1">最大分類1</option>
                    <option value="2">最大分類2</option>
                </Select>
            </FormControl>

            {hitCount !== undefined && (
                <Text fontSize="sm" color="gray.600" mt={2}>該当記事数: {hitCount}件</Text>
            )}
        </Box>
    )
}