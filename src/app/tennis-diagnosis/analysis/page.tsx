"use client";
import { useEffect, useState, useRef } from "react";
import { useDiagnosis } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { 
  Box, Heading, Text, Button, useColorModeValue, Center, VStack, Image as ChakraImage, chakra, Divider, Flex, useToast
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { motion, Variants } from "framer-motion";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const GradientText = chakra('span', {
  baseStyle: {
    bgGradient: 'linear(to-r, blue.500, teal.400)',
    bgClip: 'text',
    fontWeight: 'extrabold',
  }
});

const loadingBallVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const commentContainerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const commentItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 }
};

export default function AnalysisPage() {
    const { state, dispatch } = useDiagnosis();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const initialAnswersRef = useRef(state.answers);

    useEffect(() => {
        async function analyze() {
            const res = await fetch('/api/tennis-diagnosis/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: initialAnswersRef.current })
            });
            if (res.ok) {
                const data = await res.json();
                dispatch({ type: 'SET_TYPE', typeName: data.typeName, comment: data.comment });
            }
            setLoading(false);
        }
        analyze();
    }, [dispatch]);

    useEffect(() => {
        if (!loading && state.typeName && state.comment) {
            // プロフィールを取得してdisplay_nameを確保してから更新
            fetchProfileAndUpdate(state.typeName, state.comment);
        }
    }, [loading, state.typeName, state.comment]);

    async function fetchProfileAndUpdate(typeName: string, comment: string) {
        try {
            const profileRes = await fetch('/api/profile', { method: 'GET' });
            const profileData = await profileRes.json();
            if (!profileRes.ok || !profileData?.display_name) {
                throw new Error('プロフィールの取得に失敗しました');
            }
            await updateProfileWithAnalysis(profileData.display_name, typeName, comment);
        } catch (error: any) {
            toast({
                title: 'プロフィール取得エラー',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    async function updateProfileWithAnalysis(display_name: string, typeName: string, comment: string) {
        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  display_name,
                  tennis_type_name: typeName,
                  tennis_comment: comment
                })
            });
            const json = await res.json();
            if (!res.ok) {
                throw new Error(json.error || 'Failed to update profile');
            }
            toast({
                title: 'プロフィールが更新されました',
                description: 'テニス診断結果がプロフィールに保存されました。',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error: any) {
            toast({
                title: 'プロフィール更新エラー',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const bgGradient = useColorModeValue("linear(to-b, blue.50, white)", "linear(to-b, gray.900, gray.800)");
    const cardBg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const highlightColor = useColorModeValue("blue.600", "teal.300");
    const dividerColor = useColorModeValue("gray.300","gray.600");

    if (loading) {
        return (
            <Box 
              minH="100vh" 
              bgGradient={bgGradient}
              display="flex"
              alignItems="center"
              justifyContent="center"
              px={4}
            >
                <VStack spacing={6} textAlign="center">
                    <MotionBox
                      as={ChakraImage}
                      src="/tennis-ball.png"
                      alt="Loading tennis ball"
                      boxSize="60px"
                      animate="animate"
                      variants={loadingBallVariants}
                    />
                    <Text color={textColor} fontSize="xl" fontWeight="semibold">
                        分析中です...
                    </Text>
                    <Text color={textColor} fontSize="md">
                        あなたのテニススタイルを解析しています。<br/>
                        少々お待ちください。
                    </Text>
                </VStack>
            </Box>
        );
    }

    const commentLines = state.comment.split('\n').filter(line => line.trim() !== '');

    return (
        <Box 
            minH="100vh" 
            bgGradient={bgGradient}
            py={{ base: 12, md: 20 }}
            px={{ base: 4, md: 6 }}
            backgroundImage="url('/tennis-court-pattern.png')"
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <MotionBox
                maxW="md"
                mx="auto"
                bg={cardBg}
                boxShadow="2xl"
                rounded="lg"
                p={{ base: 6, md: 8 }}
                textAlign="center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Center mb={6}>
                    <ChakraImage 
                        src="/tennis-icon.png" 
                        alt="Tennis Icon" 
                        boxSize="80px" 
                        borderRadius="full"
                        boxShadow="md"
                    />
                </Center>

                <Heading as="h2" size="lg" mb={4} color={highlightColor} fontWeight="bold">
                    分析結果
                </Heading>
                <Divider mb={4} borderColor={dividerColor} />

                <Text fontSize="lg" fontWeight="semibold" mb={2} color={textColor}>
                    あなたのタイプ名: <GradientText>{state.typeName}</GradientText>
                </Text>
                <Text fontSize="sm" color={textColor} mb={6}>
                    このタイプはあなたのプレイスタイルや戦略に基づく特徴を示しています。
                </Text>

                <MotionBox
                  textAlign="left"
                  color={textColor}
                  mb={6}
                  lineHeight="tall"
                  variants={commentContainerVariants}
                  initial="hidden"
                  animate="show"
                >
                    {commentLines.map((line, idx) => (
                        <MotionFlex 
                            key={idx} 
                            mb={3} 
                            align="flex-start" 
                            variants={commentItemVariants}
                        >
                            <ChakraImage src="/tennis-ball.png" alt="Bullet Ball" boxSize="20px" mr={2} />
                            <Text flex="1">{line}</Text>
                        </MotionFlex>
                    ))}
                </MotionBox>

                <Button
                    onClick={() => router.push('/tennis-diagnosis/character')}
                    colorScheme="blue"
                    size="lg"
                    rightIcon={<ChevronRightIcon />}
                    borderRadius="full"
                    fontWeight="bold"
                    px={8}
                    py={6}
                    _hover={{ transform: "scale(1.03)", boxShadow: "md" }}
                    _active={{ transform: "scale(0.98)" }}
                    transition="all 0.2s"
                >
                    次へ（キャラクター生成用情報入力）
                </Button>
            </MotionBox>
        </Box>
    );
}