// src/app/api/tennis-diagnosis/generate-image/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set.');
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

// リクエストボディの型定義
interface RequestBody {
    analysisComment: string;
    gender: string; // '男', '女', またはその他
    animal: string; // 日本語名の動物
}

// 日本語動物名→英語動物名へのマッピング
const animalMapping: Record<string, string> = {
    "ネコ": "cat",
    "イヌ": "dog",
    "ウサギ": "rabbit",
    "パンダ": "panda",
    "キツネ": "fox",
    "サル": "monkey",
    "ウマ": "horse",
    "シカ": "deer",
    "イノシシ": "boar",
    "クマ": "bear",
    "スズメ": "sparrow",
    "ツバメ": "swallow",
    "タカ": "hawk",
    "ワシ": "eagle",
    "フクロウ": "owl",
    "カラス": "crow",
    "ペンギン": "penguin",
    "ダチョウ": "ostrich",
    "クジャク": "peacock",
    "ハト": "pigeon",
    "ヘビ": "snake",
    "トカゲ": "lizard",
    "カメ": "turtle",
    "ワニ": "crocodile",
    "イグアナ": "iguana",
    "サメ": "shark",
    "クジラ": "whale",
    "イルカ": "dolphin",
    "カワウソ": "otter",
    "アシカ": "sea lion",
    "アザラシ": "seal",
    "マンボウ": "sunfish",
    "サケ": "salmon",
    "マグロ": "tuna",
    "カニ": "crab",
    "ドラゴン": "dragon",
    "ユニコーン": "unicorn",
    "フェニックス": "phoenix",
    "キマイラ": "chimera",
    "ケルベロス": "cerberus",
    "ウシ": "cow",
    "ヤギ": "goat",
    "ヒツジ": "sheep",
    "ブタ": "pig",
    "ニワトリ": "chicken",
    "カンガルー": "kangaroo",
    "コアラ": "koala",
    "レッサーパンダ": "red panda",
    "ハリネズミ": "hedgehog",
    "ハムスター": "hamster"
};

export async function POST(request: Request) {
    try {
        const { analysisComment, gender, animal } = await request.json() as RequestBody;

        if (!analysisComment || !gender || !animal) {
            return NextResponse.json({ error: 'Missing required parameters (analysisComment, gender, animal).' }, { status: 400 });
        }

        // 性別正規化
        let normalizedGender: string;
        if (gender === '男') {
            normalizedGender = '男性';
        } else if (gender === '女') {
            normalizedGender = '女性';
        } else {
            normalizedGender = 'その他';
        }

        // 動物名英語変換
        const animalEnglish = animalMapping[animal] || animal;

        // 性別表現
        let animalGenderDescription = "";
        if (normalizedGender === "男性") {
            animalGenderDescription = "male (オス)";
        } else if (normalizedGender === "女性") {
            animalGenderDescription = "female (メス)";
        } else {
            animalGenderDescription = "gender-neutral (中性)";
        }

        // システムメッセージ
        const systemMessage = `
        You are a highly skilled prompt engineer. Based on the given information, produce a single English prompt suitable for DALL·E 3 image generation.

        Requirements:
        1. The character is an anthropomorphic ${animalGenderDescription} ${animalEnglish}, depicted in a Japanese anime style, chibi (two-headed tall), and very cute.
        2. The character should primarily resemble a ${animalEnglish} standing upright and wearing appropriate tennis attire, such as a sporty tennis outfit and holding a tennis racket, while retaining the ${animalEnglish}'s facial features, fur, ears, tail, and general body shape. The figure should not simply be a human with ${animalEnglish} ears, but a fully anthropomorphic ${animalEnglish}.
        3. Use the provided analysis to guide the character’s personality, playing style, facial expression, pose, and clothing: "${analysisComment}"
        4. The character’s pose and expression should reflect their personality and playing style.
        5. The background should be a simplified tennis court, with a bright and energetic color scheme.
        6. Do not include any text, logos, or UI elements in the image.
        7. The prompt must be in English and describe the scene in a way DALL·E 3 can directly use.
        `.trim();

        const userMessage = `
Analysis Comment: ${analysisComment}
Gender selected: ${gender} (normalized to ${normalizedGender})
Animal chosen (Japanese): ${animal}
Animal in English: ${animalEnglish}
Animal-based gender description: ${animalGenderDescription}
`.trim();

        // GPT-4でプロンプト生成
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: systemMessage },
                { role: "user", content: userMessage }
            ],
            temperature: 0.7
        });

        const generatedPrompt = chatResponse.choices[0]?.message?.content?.trim();
        if (!generatedPrompt) {
            console.error("No prompt returned from GPT-4.");
            return NextResponse.json({ error: 'No prompt returned from GPT-4.' }, { status: 500 });
        }

        console.log("Used prompt for image generation:", generatedPrompt);

        // DALL·E 3で画像生成
        const imageResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: generatedPrompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            response_format: "url"
        });

        if (!imageResponse.data || imageResponse.data.length === 0) {
            console.error("No image returned from DALL·E 3.");
            return NextResponse.json({ error: 'No image returned from DALL·E 3.' }, { status: 500 });
        }

        const imageUrl = imageResponse.data[0].url;
        return NextResponse.json({ imageUrl, usedPrompt: generatedPrompt });

    } catch (error: any) {
        console.error('OpenAI API error:', error.response?.data || error.message || error);
        return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
    }
}