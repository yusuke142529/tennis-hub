// src/app/tennis-diagnosis/questions/page.tsx
"use client";

import Link from 'next/link';
import { Box, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';

export default function QuestionsIndexPage() {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(to-b, blue.50, white)"
      py={{ base: 12, md: 20 }}
      px={{ base: 4, md: 6 }}
    >
      <Box
        maxW="md"
        mx="auto"
        bg={cardBg}
        boxShadow="xl"
        rounded="lg"
        p={{ base: 6, md: 10 }}
        textAlign="center"
      >
        <Heading as="h2" size="lg" mb={4} color="blue.600" fontWeight="bold">
          質問回答ステップ
        </Heading>
        <Text mb={6} color={textColor} lineHeight="tall">
          これからA～Iまでのカテゴリー順に質問に回答していきます。<br/>
          Aカテゴリーから自動的にスタートし、全て回答し終わると分析結果のページへ進みます。
        </Text>

        <Text mb={8} color="gray.500" fontSize="sm">
          所要時間：約5～10分程度<br/>
          一度に全て回答せず、中断して後で再開することも可能です。（※実装次第）
        </Text>

        <Link href="/tennis-diagnosis/questions/A" style={{ textDecoration: 'none' }}>
          <Button 
            size="lg" 
            colorScheme="blue" 
            variant="solid"
            borderRadius="full"
            px={10}
            py={6}
            fontSize="lg"
            fontWeight="bold"
            _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
            _active={{ transform: "scale(0.98)" }}
            transition="all 0.2s"
          >
            回答を開始する
          </Button>
        </Link>
      </Box>
    </Box>
  );
}