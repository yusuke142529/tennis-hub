"use client"

import { WysiwygEditor } from "@/components/WysiwygEditor"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Spinner,
  useColorModeValue
} from "@chakra-ui/react"

export default function AdminEditPostPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setTitle(data.title)
        setContent(data.content)
        setCategoryId(data.categoryId?.toString() || "")
      } else {
        toast({
          title: "エラー",
          description: "記事取得に失敗しました",
          status: "error",
          duration: 4000,
          isClosable: true,
        })
      }
      setLoading(false)
    }
    fetchPost()
  }, [params.id, toast])

  const handleUpdate = async () => {
    const sendCategoryId = categoryId ? Number(categoryId) : null
    const res = await fetch(`/api/posts/${params.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, categoryId: sendCategoryId })
    })
    if (res.ok) {
      toast({
        title: "更新完了",
        description: "記事が更新されました",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      router.push("/admin/posts")
      router.refresh() // 更新後の一覧ページデータ再取得
    } else {
      toast({
        title: "エラー",
        description: "記事更新に失敗しました",
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const bg = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" fontWeight="bold" mb={4}>
        記事編集
      </Heading>
      {loading ? (
        <Box textAlign="center" mt={8}>
          <Spinner size="lg" />
        </Box>
      ) : (
        <Box bg={bg} p={4} borderRadius="md" border="1px" borderColor={borderColor}>
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
              <option value="1">用具とギア</option>
              <option value="2">技術とスキル</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>本文</FormLabel>
            <WysiwygEditor value={content} onChange={setContent}/>
          </FormControl>

          <Button colorScheme="blue" onClick={handleUpdate} mr={4}>
            更新
          </Button>
          <Button onClick={() => { router.push("/admin/posts"); router.refresh(); }} variant="outline">
            記事管理へ戻る
          </Button>
        </Box>
      )}
    </Box>
  )
}