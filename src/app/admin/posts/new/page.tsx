"use client"

import { WysiwygEditor } from "@/components/WysiwygEditor"
import { useState, useEffect } from "react"
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useColorModeValue
} from "@chakra-ui/react"
import { useRouter } from "next/navigation"

type Category = {
  id: string | number;
  name: string;
}

export default function AdminNewPostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories")
      if (res.ok) {
        const data = await res.json()
        setCategories(data.data)
      } else {
        console.error("カテゴリ取得に失敗しました")
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async () => {
    const sendCategoryId = categoryId ? Number(categoryId) : null
    console.log("Sending categoryId:", sendCategoryId) // デバッグ用
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, categoryId: sendCategoryId })
    })
    if (res.ok) {
      alert("記事が保存されました")
      router.push("/admin/posts")
      router.refresh() // 新規記事を反映するためリフレッシュ
    } else {
      alert("記事作成に失敗しました")
    }
  }

  const bg = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" fontWeight="bold" mb={4}>
        新規記事投稿
      </Heading>

      <Box bg={bg} p={4} borderRadius="md" border="1px" borderColor={borderColor} mb={4}>
        <FormControl mb={4}>
          <FormLabel>タイトル</FormLabel>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="記事のタイトルを入力"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>カテゴリ</FormLabel>
          <Select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            placeholder="カテゴリを選択"
          >
            {categories.map(cat => (
              <option key={cat.id.toString()} value={cat.id.toString()}>
                {cat.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>本文</FormLabel>
          <WysiwygEditor value={content} onChange={setContent} />
        </FormControl>

        <Button colorScheme="green" onClick={handleSubmit} mr={4}>
          保存
        </Button>
        <Button onClick={() => { router.push("/admin/posts"); router.refresh(); }} variant="outline">
          記事管理へ戻る
        </Button>
      </Box>
    </Box>
  )
}