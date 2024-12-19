"use client";

import { useEffect, useState } from "react";
import { useDiagnosis } from '@/lib/store';
import {
  Box,
  Heading,
  Spinner,
  Text,
  Image as ChakraImage,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  VStack,
  HStack,
  Fade,
  ScaleFade,
  useToast,
  Skeleton
} from "@chakra-ui/react";
import { DownloadIcon, RepeatIcon, ArrowBackIcon } from '@chakra-ui/icons';

export default function TennisDiagnosisImagePage() {
  const { state } = useDiagnosis();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const gender = state.gender;
  const animal = state.animal;
  const analysisComment = state.comment;

  const generateImage = async () => {
    try {
      setLoading(true);
      setError(null);
      setImageUrl(null);

      const response = await fetch("/api/tennis-diagnosis/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ gender, animal, analysisComment })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image");
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (err: any) {
      setError(err.message || "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateImage();
  }, [gender, animal, analysisComment]);

  useEffect(() => {
    if (!loading && !error && imageUrl) {
      fetchProfileAndUpdateImage(imageUrl);
    }
  }, [loading, error, imageUrl]);

  async function fetchProfileAndUpdateImage(url: string) {
    try {
      const profileRes = await fetch('/api/profile', { method: 'GET' });
      const profileData = await profileRes.json();
      if (!profileRes.ok || !profileData?.display_name) {
        throw new Error('プロフィールの取得に失敗しました');
      }

      await updateProfileWithImage(profileData.display_name, url);
    } catch (err: any) {
      toast({
        title: 'プロフィール取得エラー',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function updateProfileWithImage(display_name: string, url: string) {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name,
          tennis_image_url: url
        })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to update profile');
      }
      toast({
        title: 'プロフィールが更新されました',
        description: '生成されたキャラクター画像がプロフィールに保存されました。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: 'プロフィール更新エラー',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'tennis_character.png';
    link.click();
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, green.100, green.300)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={8}
    >
      <VStack spacing={8} w="full" maxW="600px" textAlign="center">
        <Heading size="lg" fontWeight="bold" color="green.800" display="flex" alignItems="center" justifyContent="center">
          テニスキャラクター生成
        </Heading>

        {loading && !error && (
          <VStack spacing={4}>
            <Spinner size="xl" color="green.500" />
            <Text fontSize="lg" color="green.700">
              生成中です。少々お待ちください...
            </Text>
            <Skeleton height="300px" width="100%" rounded="lg" fadeDuration={1}/>
          </VStack>
        )}

        {!loading && error && (
          <Alert status="error" rounded="md" boxShadow="md">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>エラーが発生しました</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {!loading && !error && imageUrl && (
          <ScaleFade initialScale={0.9} in={!loading && !!imageUrl}>
            <Box
              border="1px solid"
              borderColor="gray.300"
              bg="white"
              rounded="lg"
              boxShadow="xl"
              p={4}
              transition="all 0.3s ease"
              _hover={{ boxShadow: "2xl" }}
            >
              <ChakraImage
                src={imageUrl}
                alt="Generated Tennis Character"
                borderRadius="md"
                maxW="512px"
                mx="auto"
              />
              <Text mt={4} color="gray.700">
                あなたのテニスキャラクターが完成しました！
              </Text>
            </Box>
          </ScaleFade>
        )}

        <HStack spacing={4}>
          <Button
            leftIcon={<RepeatIcon />}
            colorScheme="green"
            variant="solid"
            onClick={generateImage}
            isDisabled={loading}
          >
            再生成
          </Button>

          {!loading && !error && imageUrl && (
            <Button
              leftIcon={<DownloadIcon />}
              colorScheme="teal"
              variant="outline"
              onClick={handleDownload}
            >
              ダウンロード
            </Button>
          )}

          <Button
            leftIcon={<ArrowBackIcon />}
            variant="ghost"
            colorScheme="gray"
            onClick={() => window.history.back()}
          >
            戻る
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}