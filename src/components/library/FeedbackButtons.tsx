"use client"

import { Box, Text, Button, Stack, useToast } from "@chakra-ui/react"
import { useState } from "react"

type FeedbackButtonsProps = {
    postId: number
}

export default function FeedbackButtons({ postId }: FeedbackButtonsProps) {
    const [hasFeedback, setHasFeedback] = useState(false)
    const toast = useToast()

    async function sendFeedback(helpful: boolean) {
        if (hasFeedback) return
        const res = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId, helpful })
        })
        if (res.ok) {
            setHasFeedback(true)
            toast({
                title: "フィードバックありがとうございます！",
                status: "success",
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: "フィードバック送信に失敗しました",
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
    }

    return (
        <Box mt={6} aria-label="記事フィードバック">
            <Text fontSize="sm" mb={2}>この情報は役に立ちましたか？</Text>
            <Stack direction="row" spacing={2}>
                <Button size="sm" onClick={() => sendFeedback(true)} isDisabled={hasFeedback}>役に立った</Button>
                <Button size="sm" onClick={() => sendFeedback(false)} isDisabled={hasFeedback}>情報不足</Button>
            </Stack>
        </Box>
    )
}