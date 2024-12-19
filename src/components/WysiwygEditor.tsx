"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Box, Button, ButtonGroup, IconButton, useColorModeValue, Tooltip, Flex } from "@chakra-ui/react"
import { MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdFormatQuote, MdUndo, MdRedo } from "react-icons/md"

type WysiwygEditorProps = {
  value: string
  onChange: (val: string) => void
}

export function WysiwygEditor({ value, onChange }: WysiwygEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
    // SSRによるHydration Mismatch回避用
    immediatelyRender: false,
  })

  const borderColor = useColorModeValue("gray.200", "gray.600")
  const bg = useColorModeValue("white", "gray.700")
  const hoverBg = useColorModeValue("gray.100", "gray.600")

  if (!editor) {
    return null
  }

  // ボタン有効状態
  const isBoldActive = editor.isActive('bold')
  const isItalicActive = editor.isActive('italic')
  const isBulletListActive = editor.isActive('bulletList')
  const isOrderedListActive = editor.isActive('orderedList')
  const isBlockquoteActive = editor.isActive('blockquote')

  return (
    <Box border="1px" borderColor={borderColor} borderRadius="md" p={2} bg={bg}>
      <Flex mb={2} wrap="wrap" gap={2}>
        <ButtonGroup size="sm" isAttached variant="ghost">
          <Tooltip label="太字 (Ctrl+B)" placement="top">
            <IconButton
              aria-label="Bold"
              icon={<MdFormatBold />}
              onClick={() => editor.chain().focus().toggleBold().run()}
              color={isBoldActive ? "blue.500" : undefined}
              _hover={{ bg: hoverBg }}
            />
          </Tooltip>

          <Tooltip label="斜体 (Ctrl+I)" placement="top">
            <IconButton
              aria-label="Italic"
              icon={<MdFormatItalic />}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              color={isItalicActive ? "blue.500" : undefined}
              _hover={{ bg: hoverBg }}
            />
          </Tooltip>
        </ButtonGroup>

        <ButtonGroup size="sm" isAttached variant="ghost">
          <Tooltip label="番号なしリスト" placement="top">
            <IconButton
              aria-label="Bullet List"
              icon={<MdFormatListBulleted />}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              color={isBulletListActive ? "blue.500" : undefined}
              _hover={{ bg: hoverBg }}
            />
          </Tooltip>

          <Tooltip label="番号つきリスト" placement="top">
            <IconButton
              aria-label="Ordered List"
              icon={<MdFormatListNumbered />}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              color={isOrderedListActive ? "blue.500" : undefined}
              _hover={{ bg: hoverBg }}
            />
          </Tooltip>
        </ButtonGroup>

        <Tooltip label="引用" placement="top">
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Blockquote"
            icon={<MdFormatQuote />}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            color={isBlockquoteActive ? "blue.500" : undefined}
            _hover={{ bg: hoverBg }}
          />
        </Tooltip>

        <ButtonGroup size="sm" variant="ghost">
          <Tooltip label="元に戻す" placement="top">
            <IconButton
              aria-label="Undo"
              icon={<MdUndo />}
              onClick={() => editor.chain().focus().undo().run()}
              _hover={{ bg: hoverBg }}
            />
          </Tooltip>

          <Tooltip label="やり直す" placement="top">
            <IconButton
              aria-label="Redo"
              icon={<MdRedo />}
              onClick={() => editor.chain().focus().redo().run()}
              _hover={{ bg: hoverBg }}
            />
          </Tooltip>
        </ButtonGroup>
      </Flex>

      <Box
        border="1px"
        borderColor={borderColor}
        borderRadius="md"
        p={2}
        minH="150px"
        cursor="text"
        _focusWithin={{ outline: "2px solid", outlineColor: "blue.300" }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  )
}