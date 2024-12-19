"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import {
  Box,
  Heading,
  Input,
  Button,
  useToast,
  useColorModeValue,
  FormControl,
  FormLabel,
  List,
  ListItem
} from "@chakra-ui/react"

type Category = {
  id: string | number;
  name: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [newName, setNewName] = useState("")
  const toast = useToast()

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories")
      if (res.ok) {
        const data = await res.json()
        setCategories(data.data)
      } else {
        toast({
          title: "エラー",
          description: "カテゴリ取得に失敗しました",
          status: "error",
          duration: 4000,
          isClosable: true
        })
      }
    }
    fetchCategories()
  }, [toast])

  const handleCreate = async () => {
    if (!newName.trim()) return
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ name: newName })
    })
    if (res.ok) {
      const created = await res.json()
      setCategories(prev => [...prev, created.data])
      setNewName("")
      toast({
        title: "カテゴリ追加",
        description: "新しいカテゴリが追加されました",
        status: "success",
        duration: 3000,
        isClosable: true
      })
    } else {
      toast({
        title: "エラー",
        description: "カテゴリ追加に失敗しました",
        status: "error",
        duration: 4000,
        isClosable: true
      })
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const newOrder = Array.from(categories)
    const [moved] = newOrder.splice(result.source.index, 1)
    newOrder.splice(result.destination.index, 0, moved)
    setCategories(newOrder)

    // 将来的に並び順をサーバーに保存可能
  }

  const bg = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const hoverBg = useColorModeValue("gray.100", "gray.600")

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" fontWeight="bold" mb={4}>
        カテゴリ管理
      </Heading>

      <Box mb={4}>
        <FormControl display="flex" gap={2} alignItems="flex-end">
          <Box flex="1">
            <FormLabel srOnly>新規カテゴリ名</FormLabel>
            <Input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="新規カテゴリ名"
            />
          </Box>
          <Button colorScheme="green" onClick={handleCreate}>
            追加
          </Button>
        </FormControl>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <List
              spacing={2}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {categories.map((cat, index) => (
                <Draggable key={cat.id.toString()} draggableId={cat.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      bg={bg}
                      border="1px"
                      borderColor={borderColor}
                      p={2}
                      borderRadius="md"
                      boxShadow={snapshot.isDragging ? "md" : "sm"}
                      _hover={{ bg: hoverBg }}
                    >
                      {cat.name}
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}