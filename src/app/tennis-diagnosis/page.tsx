// src/app/tennis-diagnosis/page.tsx
"use client";

import Link from "next/link";
import { Box, Heading, Text, Button, Image, Flex } from "@chakra-ui/react";

export default function TennisDiagnosisPage() {
  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(to-b, blue.50, white)"
      py={12}
      px={4}
    >
      <Flex direction="column" align="center" justify="center" maxW="lg" mx="auto">
        
        {/* イメージを追加（publicフォルダにtennis-hero.jpgなどを配置） */}
        <Image 
          src="/tennis-hero.jpg" 
          alt="Tennis AI Diagnosis" 
          borderRadius="md" 
          mb={8}
          boxShadow="lg"
          maxH="250px"
          objectFit="cover"
        />

        <Box
          bg="white"
          boxShadow="xl"
          rounded="lg"
          p={8}
          width="100%"
          textAlign="center"
        >
          <Heading as="h1" size="lg" mb={4} color="blue.600">
            テニス・パーソナリティAI診断
          </Heading>
          <Text mb={6} color="gray.700" lineHeight="tall">
            質問に回答して、あなたのテニススタイルやパーソナリティを分析します。<br/>
            分析結果から、オリジナルテニスキャラクターのイラストも生成します。
          </Text>
          <Link href="/tennis-diagnosis/questions">
            <Button 
              size="lg" 
              colorScheme="blue" 
              variant="solid"
              _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
              _active={{ transform: "scale(0.98)" }}
              transition="all 0.2s"
            >
              診断を開始する
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}