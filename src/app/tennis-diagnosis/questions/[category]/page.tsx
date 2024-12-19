"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import {
    Box, Heading, Text, Button, VStack, Radio, RadioGroup,
    FormControl, FormLabel, Input, useColorModeValue, Progress,
    HStack, Tooltip, Icon, Divider, Alert, AlertIcon
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import questionsData from '@/lib/questions';
import { useDiagnosis } from '@/lib/store';

export default function CategoryQuestionsPage() {
    const params = useParams();
    const category = params.category as string;
    const router = useRouter();
    const { state, dispatch } = useDiagnosis();

    const allCategories = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const currentIndex = allCategories.indexOf(category);
    const categoryQuestions = questionsData[category] || [];

    const [localAnswers, setLocalAnswers] = useState<{ [questionId: string]: { option: number | null, freeText: string } }>({});

    useEffect(() => {
        const init: { [key: string]: { option: number | null; freeText: string } } = {};
        categoryQuestions.forEach(q => {
            init[q.id] = state.answers[q.id] || { option: null, freeText: '' };
        });
        setLocalAnswers(init);
    }, [categoryQuestions, state.answers]);

    const handleChange = (qId: string, option: number | null, freeText: string = '') => {
        setLocalAnswers(prev => ({ ...prev, [qId]: { option, freeText } }));
    };

    const handleNext = () => {
        // グローバルストアへ回答保存
        for (const qId in localAnswers) {
            dispatch({ type: 'SET_ANSWER', questionId: qId, answer: localAnswers[qId] });
        }

        if (currentIndex < allCategories.length - 1) {
            router.push(`/tennis-diagnosis/questions/${allCategories[currentIndex + 1]}`);
        } else {
            router.push('/tennis-diagnosis/analysis');
        }
    };

    // 全て回答済みか判定
    const allAnswered = categoryQuestions.every(q => localAnswers[q.id]?.option !== null);

    const bgGradient = useColorModeValue("linear(to-b, blue.50, white)", "linear(to-br, gray.800, gray.700)");
    const cardBg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const progressColor = useColorModeValue("blue", "teal");

    // 任意でカテゴリーごとの説明テキストを用意(例)
    const categoryExplanations: { [key: string]: string } = {
        'A': '基本的なプレースタイルに関する質問です。',
        'B': 'フィジカル面に関する質問です。',
        'C': 'メンタル面に関する質問です。',
        'D': 'ゲーム戦略に関する質問です。',
        'E': 'サーブ・レシーブに関する質問です。',
        'F': 'ストロークに関する質問です。',
        'G': 'ネットプレーに関する質問です。',
        'H': 'フットワークに関する質問です。',
        'I': '総合的な印象やプレースタイルに関する自由形式の質問です。'
    };

    return (
        <Box
            minH="100vh"
            bgGradient={bgGradient}
            py={{ base: 12, md: 20 }}
            px={{ base: 4, md: 6 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                maxW="2xl"
                w="full"
                mx="auto"
                bg={cardBg}
                boxShadow="2xl"
                rounded="lg"
                p={{ base: 6, md: 8 }}
                transition="all 0.3s"
            >
                {/* ステップ表示 */}
                <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" color="gray.500">
                        ステップ {currentIndex + 1} / {allCategories.length}
                    </Text>
                    <Tooltip label="全てのステップ回答後に分析が可能になります" aria-label="Step tooltip">
                        <Box cursor="help">
                            <Icon as={InfoOutlineIcon} color="gray.400" />
                        </Box>
                    </Tooltip>
                </HStack>
                <Progress
                    value={((currentIndex + 1) / allCategories.length) * 100}
                    mb={6}
                    colorScheme={progressColor}
                    height="6px"
                    rounded="full"
                />

                <Heading as="h3" size="lg" mb={3} color="blue.600" fontWeight="bold">
                    カテゴリー {category}
                </Heading>
                <Text mb={6} color={textColor} lineHeight="tall">
                    {categoryExplanations[category] || 'このカテゴリーに関する質問にお答えください。'}<br />
                    全ての質問に回答すると次のステップへ進むことができます。
                </Text>

                <VStack as="form" align="stretch" spacing={6}>
                    {categoryQuestions.map((q, qIndex) => (
                        <Box key={q.id} pb={4}>
                            <Text fontWeight="semibold" mb={3}>{q.id}. {q.text}</Text>
                            <VStack align="start" spacing={3}>
                                {/* 選択肢ラジオ */}
                                <RadioGroup
                                    value={localAnswers[q.id]?.option ? String(localAnswers[q.id]?.option) : ''}
                                    onChange={(val) => {
                                        const option = Number(val);
                                        handleChange(q.id, option);
                                    }}
                                >
                                    <VStack align="start" spacing={2}>
                                        {q.options.map((opt, idx) => (
                                            <Radio
                                                key={idx}
                                                value={String(idx + 1)}
                                                colorScheme="blue"
                                                _focusVisible={{ boxShadow: "outline" }}
                                            >
                                                {`${idx + 1}. ${opt}`}
                                            </Radio>
                                        ))}
                                    </VStack>
                                </RadioGroup>

                                {q.hasFreeInput && localAnswers[q.id]?.option === 5 && (
                                    <FormControl mt={4}>
                                        <FormLabel fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                                            5. 自由記述:
                                        </FormLabel>
                                        <Input
                                            value={localAnswers[q.id]?.freeText}
                                            onChange={e => handleChange(q.id, 5, e.target.value)}
                                            placeholder="自由回答を入力してください"
                                            size="md"
                                            borderColor="gray.300"
                                            _placeholder={{ color: 'gray.400' }}
                                            _focusVisible={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                                        />
                                    </FormControl>
                                )}
                            </VStack>
                            {qIndex < categoryQuestions.length - 1 && <Divider mt={4} opacity={0.5} />}
                        </Box>
                    ))}
                </VStack>

                {/* 全て回答していない場合の注意喚起 */}
                {!allAnswered && (
                    <Alert status="info" mt={6} rounded="md">
                        <AlertIcon />
                        すべての質問に回答するまで「次へ」に進むことはできません。
                    </Alert>
                )}

                <Tooltip
                    label={allAnswered ? "" : "全ての質問に回答する必要があります"}
                    isDisabled={allAnswered}
                    aria-label="Next button tooltip"
                >
                    <Box mt={8}>
                        <Button
                            onClick={handleNext}
                            colorScheme={allAnswered ? "green" : "gray"}
                            size="lg"
                            w="full"
                            borderRadius="full"
                            fontWeight="bold"
                            _hover={{ transform: allAnswered ? "scale(1.03)" : "none", boxShadow: allAnswered ? "md" : "none" }}
                            _active={{ transform: allAnswered ? "scale(0.98)" : "none" }}
                            transition="all 0.2s"
                            disabled={!allAnswered}
                        >
                            {currentIndex < allCategories.length - 1 ? '次へ' : '分析へ'}
                        </Button>
                    </Box>
                </Tooltip>
            </Box>
        </Box>
    );
}