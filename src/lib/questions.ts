// src/lib/questions.ts

export type Question = {
  id: string;
  category: string;
  text: string;
  options: string[]; // 1～4の選択肢
  hasFreeInput?: boolean; // 5番自由回答有無
};

const categoryA: Question[] = [
  {
    id: 'A-1',
    category: 'A',
    text: '「ラリー中、攻めのショットを選ぶ際、どのような傾向がありますか？」',
    options: [
      '得意なフォア側に回り込み速攻で決着を図る',
      'フォア・バック問わず強打で主導権を握る',
      'ミスを避け、どちらのショットも安定返球を重視',
      '状況に応じフォア・バックで緩急・回転を自在に操る',
    ],
    hasFreeInput: true,
  },
  {
    id: 'A-2',
    category: 'A',
    text: '「自分からポイントを取る際、主に使うショットは？」',
    options: [
      'アプローチ・ボレーなどで前に詰めて一気に攻める',
      '強力なグラウンドストロークで相手を後退させる',
      '深くコートに返し相手ミスを誘う安定ショット',
      'ドロップ・スライス・トップスピンなど多彩なショットを組み合わせる',
    ],
    hasFreeInput: true,
  },
];

const categoryB: Question[] = [
  {
    id: 'B-1',
    category: 'B',
    text: '「サービスゲーム開始時、あなたはどう攻める？」',
    options: [
      '高速サーブ後すぐネット突入、短期決着狙う',
      '後方から強打で相手を押し込む',
      '正確返球を重ね相手ミス待つ',
      '球種・コースを変化させ柔軟に対応',
    ],
    hasFreeInput: true,
  },
  {
    id: 'B-2',
    category: 'B',
    text: '「相手が強いサーブを打ってきたら？」',
    options: [
      '素早いリターンで前進し即ポイント奪う',
      '深いリターン強打で相手を後退させる',
      '確実返球し長ラリーで相手ほころび待ち',
      '多彩なリターンで相手ペース崩す',
    ],
    hasFreeInput: true,
  },
  {
    id: 'B-3',
    category: 'B',
    text: '「リターンゲームでブレーク狙うときは？」',
    options: [
      '早打ちリターンで即ポイント奪う',
      '深いリターンで相手を押し下げる',
      '安全返球でラリー伸ばし相手ミス待つ',
      'リターンを多彩化し相手を揺さぶる',
    ],
    hasFreeInput: true,
  },
];

const categoryC: Question[] = [
  {
    id: 'C-1',
    category: 'C',
    text: '「ラリーが長引いた時、どう仕留める？」',
    options: [
      'ネット突撃しボレー・ドロップで決着',
      '強打連続で相手を後退させウィナー狙う',
      '正確返球で相手が根負けするまで粘る',
      '緩急・多彩ショットで相手翻弄',
    ],
    hasFreeInput: true,
  },
  {
    id: 'C-2',
    category: 'C',
    text: '「相手がロングラリーを好む場合？」',
    options: [
      '長引く前に前進攻撃で早期決着',
      '強打で相手を下げ最後に奪う',
      '粘りで相手を消耗させる',
      '球種変えリズム崩し主導権奪う',
    ],
    hasFreeInput: true,
  },
];

const categoryD: Question[] = [
  {
    id: 'D-1',
    category: 'D',
    text: '「接戦のタイブレークで何を選ぶ？」',
    options: [
      'リスク覚悟で前進攻撃',
      '深強打で確実ポイント確保',
      '安全返球で粘り勝つ',
      '戦術自在変更で対応',
    ],
    hasFreeInput: true,
  },
  {
    id: 'D-2',
    category: 'D',
    text: '「劣勢で逆転狙う時のプランは？」',
    options: [
      'リスク覚悟で短期決着し流れ変える',
      '攻め手強化で相手ミス誘う',
      '粘り守備で相手ほころび待つ',
      '多彩な戦術で相手リズム崩し挽回',
    ],
    hasFreeInput: true,
  },
];

const categoryE: Question[] = [
  {
    id: 'E-1',
    category: 'E',
    text: '「相手がスピン量豊富な球を多用したら？」',
    options: [
      '弾む球にも前進し決め球狙う',
      'スピンに負けず強打し相手後退',
      '的確対応で長ラリーに持ち込み隙待つ',
      'スライスでスピン緩和、多彩対応',
    ],
    hasFreeInput: true,
  },
  {
    id: 'E-2',
    category: 'E',
    text: '「相手がリズム崩していると感じたら？」',
    options: [
      '前進し短時間でポイント奪う',
      '強打で圧倒し崩壊加速',
      '安定返球で相手混乱継続狙う',
      '臨機応変な配球で翻弄',
    ],
    hasFreeInput: true,
  },
  {
    id: 'E-3',
    category: 'E',
    text: '「相手がスライスで低バウンド狙う場合？」',
    options: [
      '低球にも突進し速攻で点取る',
      '強打でスライス破り後退させる',
      '安定返球で相手変化受け止め待つ',
      'スピン・ロブ交え多角対応',
    ],
    hasFreeInput: true,
  },
  {
    id: 'E-4',
    category: 'E',
    text: '「相手がすぐネットに出てくる場合？」',
    options: [
      '即パッシング・ロブで主導奪う',
      '強打でネットプレー封じ後退させる',
      '正確返球で相手ネット戦術崩す',
      '前後左右揺さぶり混乱誘う',
    ],
    hasFreeInput: true,
  },
  {
    id: 'E-5',
    category: 'E',
    text: '「守備的な相手を攻めるには？」',
    options: [
      '果敢に前へ出てネットで仕留める',
      '強打連発で相手を下げ主導権奪う',
      '安定返球で相手疲弊狙う',
      '緩急・球種変え相手リズム崩す',
    ],
    hasFreeInput: true,
  },
  {
    id: 'E-6',
    category: 'E',
    text: '「相手の弱点を発見したら？」',
    options: [
      '弱点一気突き短期決着狙う',
      '弱点側へ強打集中崩し続ける',
      '粘り返球で弱点突き消耗狙う',
      '球種変化で弱点徹底攻める',
    ],
    hasFreeInput: true,
  },
];

const categoryF: Question[] = [
  {
    id: 'F-1',
    category: 'F',
    text: '「風が強い日の戦い方は？」',
    options: [
      '条件無視し前進攻撃で早期決着',
      '強烈ショットで風押し切り相手後退',
      '安定重視で正確返球、相手ミス誘う',
      '風を読み球種変え柔軟対応',
    ],
    hasFreeInput: true,
  },
];

const categoryG: Question[] = [
  {
    id: 'G-1',
    category: 'G',
    text: '「調子が悪い時、どう立て直す？」',
    options: [
      '攻撃姿勢維持し打点調整で短期決着',
      '強打精度上げ深いショットで流れ戻す',
      '無理せず確実返球でミス減',
      '配球・球速変え柔軟対応でバランス取る',
    ],
    hasFreeInput: true,
  },
  {
    id: 'G-2',
    category: 'G',
    text: '「相手が明らかにスタミナ切れ時、どう攻める？」',
    options: [
      '即攻撃で短期決着',
      '強打で走らせ限界引き出す',
      '長ラリーで更に疲弊誘う',
      '緩急変化で相手を苦しめる',
    ],
    hasFreeInput: true,
  },
];

const categoryH: Question[] = [
  {
    id: 'H-1',
    category: 'H',
    text: '「メンタル的に追い込まれた場面で？」',
    options: [
      '攻め続け短ラリーで一気挽回',
      '強打集中で相手押し込む',
      '確実返球で相手ミス誘い落ち着く',
      '戦術変更し多彩対応で流れ変える',
    ],
    hasFreeInput: true,
  },
];

const categoryI: Question[] = [
  {
    id: 'I-1',
    category: 'I',
    text: '「苦手ショットを相手が多用してきた時、どう対応しますか？」',
    options: [
      '苦手無視し前進速攻で逆転',
      '強打で苦手領域克服',
      '丁寧返球で相手根負け待つ',
      'ショット選択・コース工夫で苦手隠す',
    ],
    hasFreeInput: true,
  },
];

const questionsData: Record<string, Question[]> = {
  A: categoryA,
  B: categoryB,
  C: categoryC,
  D: categoryD,
  E: categoryE,
  F: categoryF,
  G: categoryG,
  H: categoryH,
  I: categoryI,
};

export default questionsData;