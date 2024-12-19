// app/api/tennis-diagnosis/analyze/route.ts
import { NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

function createAnalysisPrompt(answers: Record<string, {option: number|null, freeText: string}>) {
  // 回答からテキスト生成
  const answersText = Object.entries(answers).map(([qId, ans]) => {
    const optionText = ans.option ? `選択肢${ans.option}` : '選択なし';
    const freeText = (ans.option === 5 && ans.freeText) ? `自由記述: ${ans.freeText}` : '';
    return `質問ID: ${qId}, 回答: ${optionText} ${freeText}`;
  }).join('\n');

  return `
ユーザーはテニスプレースタイルに関する複数の質問に回答しました。
以下の回答内容から、ユーザーのテニスパーソナリティタイプ(ユニークなタイプ名)と、その特徴を詳細に説明するコメントを日本語で出力してください。

出力フォーマットは以下です:
{"typeName":"タイプ名","comment":"分析コメント"}

回答一覧:
${answersText}
`;
}

export async function POST(request: Request) {
  try {
    const { answers } = await request.json();
    if (!answers) {
      return NextResponse.json({ error: 'No answers provided' }, { status: 400 });
    }

    const prompt = createAnalysisPrompt(answers);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        // 利用可能なモデルを指定 (例: "gpt-4"、アクセス権があることが前提)
        model: "gpt-4",
        messages: [
          { role: 'system', content: 'あなたはテニス・パーソナリティ診断のアナリストです。ユーザー回答からタイプを判定し、分析コメントをわかりやすく生成してください。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', errorText);
      return NextResponse.json({ error: 'Failed to analyze' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim() || '';

    let typeName = "バランスタイプ";
    let comment = "あなたはバランス型プレーヤーです。";

    // JSONパースを試みる
    try {
      const obj = JSON.parse(content);
      typeName = obj.typeName || typeName;
      comment = obj.comment || comment;
    } catch(e) {
      console.warn('LLM output was not valid JSON. Using defaults.');
    }

    return NextResponse.json({ typeName, comment });

  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}