// src/app/tennis-diagnosis/character/page.tsx
"use client";
import { useDiagnosis } from '@/lib/store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Heading, Text, Button, useColorModeValue, VStack, RadioGroup, Radio,
  Stack, FormControl, FormLabel, Select, Center, Image
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export default function CharacterPage() {
  const { state, dispatch } = useDiagnosis();
  const router = useRouter();
  const [gender, setGender] = useState(state.gender);
  const [animal, setAnimal] = useState(state.animal);

  const handleNext = () => {
    dispatch({ type: 'SET_CHARACTER_INFO', gender, animal });
    router.push(`/tennis-diagnosis/image`);
  };

  const bgGradient = useColorModeValue("linear(to-b, blue.50, white)", "linear(to-b, gray.800, gray.700)");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const highlightColor = useColorModeValue("blue.600", "blue.300");

  // 大人向け、ややナチュラルドキュメンタリー風カテゴリー名
  const animalCategories = {
    "森林の生き物": ["ネコ","イヌ","ウサギ","パンダ","キツネ","サル","ウマ","シカ","イノシシ","クマ"],
    "空を翔る生き物": ["スズメ","ツバメ","タカ","ワシ","フクロウ","カラス","ペンギン","ダチョウ","クジャク","ハト"],
    "エキゾチックな生き物": ["ヘビ","トカゲ","カメ","ワニ","イグアナ"],
    "水辺と海の生き物": ["サメ","クジラ","イルカ","カワウソ","アシカ","アザラシ","マンボウ","サケ","マグロ","カニ"],
    "伝説の生き物": ["ドラゴン","ユニコーン","フェニックス","キマイラ","ケルベロス"],
    "牧場で出会う生き物": ["ウシ","ヤギ","ヒツジ","ブタ","ニワトリ"],
    "世界各地の生物": ["カンガルー","コアラ","レッサーパンダ","ハリネズミ","ハムスター"]
  };

  return (
    <Box 
      minH="100vh" 
      bgGradient={bgGradient}
      py={{ base: 12, md: 20 }}
      px={{ base: 4, md: 6 }}
    >
      <Box
        maxW="md"
        mx="auto"
        bg={cardBg}
        boxShadow="xl"
        rounded="lg"
        p={{ base: 6, md: 8 }}
        textAlign="center"
      >
        <Center mb={6}>
          <Image 
            src="/character-icon.png" 
            alt="Character Icon" 
            boxSize="80px" 
            borderRadius="full"
            boxShadow="md"
          />
        </Center>
        
        <Heading as="h2" size="lg" mb={4} color={highlightColor} fontWeight="bold">
          キャラクター生成用情報
        </Heading>
        <Text mb={8} color={textColor} lineHeight="tall">
          性別とお好みの動物を選んで、あなただけのテニスキャラクターを生み出しましょう。
          <br />
          設定が完了したら「画像生成へ」をクリックし、あなたのオリジナルキャラクターと対面してください。
        </Text>

        <VStack align="stretch" spacing={6}>
          <FormControl>
            <FormLabel fontSize="md" color={textColor} fontWeight="semibold">性別を選択:</FormLabel>
            <RadioGroup onChange={(val)=>setGender(val)} value={gender}>
              <Stack direction="row" spacing={4}>
                {['男','女','その他'].map(g => (
                  <Radio key={g} value={g} colorScheme="blue">{g}</Radio>
                ))}
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="md" color={textColor} fontWeight="semibold">好きな動物を選択:</FormLabel>
            <Select
              value={animal}
              onChange={(e)=>setAnimal(e.target.value)}
              placeholder="動物をお選びください..."
              borderColor="gray.300"
              _focus={{ borderColor: "blue.500" }}
              bg={useColorModeValue("white", "gray.700")}
            >
              {Object.entries(animalCategories).map(([category, animals]) => (
                <optgroup key={category} label={category}>
                  {animals.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </FormControl>

          <Button
            onClick={handleNext}
            mt={4}
            colorScheme="green"
            size="lg"
            rightIcon={<ChevronRightIcon />}
            borderRadius="full"
            fontWeight="bold"
            _hover={{ transform: "scale(1.03)", boxShadow: "md" }}
            _active={{ transform: "scale(0.98)" }}
            transition="all 0.2s"
          >
            画像生成へ
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}