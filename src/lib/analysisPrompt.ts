// src/lib/analysisPrompt.ts

// 回答群からタイプ判定するためのプロンプト例（簡略化）
export function createAnalysisPrompt(answers: any) {
    // 実際にはanswersを解析し、適切なプロンプトを組み立てる処理を書く
    return `
以下はユーザーのテニスプレー傾向を示す回答集です。これらから総合して、ユーザーのパーソナリティタイプ名と詳細コメントを日本語で生成してください。

回答例: ${JSON.stringify(answers)}

出力フォーマット:
{"typeName":"...","comment":"..."}

タイプ名はユニークでテニススタイルを象徴する名前、コメントはその特徴を詳しく説明してください。
  `;
}