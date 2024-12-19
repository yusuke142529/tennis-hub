// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  let techAndSkills = await prisma.category.findFirst({ where: { name: "技術とスキル" } })
  if (!techAndSkills) {
    techAndSkills = await prisma.category.create({
      data: { name: "技術とスキル" }
    })
  }

  type CategorySeed = {
    name: string,
    children?: CategorySeed[]
  }

  const techAndSkillsTree: CategorySeed[] = [
    {
      name: "グラウンドストローク（フォアハンド、バックハンド）",
      children: [
        {
          name: "(1) フォアハンドストローク技術",
          children: [
            {
              name: "(a) グリップの種類",
              children: [
                { name: "イースタン" },
                { name: "セミウエスタン" },
                { name: "ウエスタン" }
              ]
            },
            {
              name: "(b) スイング軌道・フォロースルー",
              children: [
                { name: "テイクバックの形（ハイ／コンパクト）" },
                { name: "インパクトポイント（体前）" },
                { name: "フォロースルーの方向（肩越し、高いフィニッシュ）" }
              ]
            },
            {
              name: "(c) フットワーク・スタンス",
              children: [
                { name: "オープンスタンス" },
                { name: "セミオープン" },
                { name: "クローズド" },
                { name: "ステップ調整（サイドステップ、シャッフルステップ）" }
              ]
            },
            {
              name: "(d) スピン・球質コントロール",
              children: [
                { name: "トップスピン" },
                { name: "フラットヒット" },
                { name: "スライス" }
              ]
            },
            {
              name: "(e) タイミング・打点調整",
              children: [
                { name: "ライジングショット" },
                { name: "ディレイドショット" },
                { name: "インサイドアウトショット" }
              ]
            }
          ]
        },
        {
          name: "(2) バックハンドストローク技術",
          children: [
            {
              name: "(a) グリップと握り方",
              children: [
                { name: "シングルハンド用イースターン" },
                { name: "ダブルハンド（トップハンド：イースタン系／ボトムハンド：コンチネンタル系）" }
              ]
            },
            {
              name: "(b) スイングメカニクス",
              children: [
                { name: "腰・肩回転によるパワー伝達" },
                { name: "ダブルハンドでの両腕バランス" },
                { name: "シングルハンドでのリーチ活用とスピンコントロール" }
              ]
            },
            {
              name: "(c) スタンス調整",
              children: [
                { name: "オープンスタンスバックハンド" },
                { name: "クローズドスタンスバックハンド" }
              ]
            },
            {
              name: "(d) スピン・スライス対応",
              children: [
                { name: "トップスピンバックハンド" },
                { name: "スライスバックハンド（低い球処理）" }
              ]
            },
            {
              name: "(e) 高低差への対応",
              children: [
                { name: "高い打点での処理" },
                { name: "低い球への対応（重心低く、スライス活用）" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "ネットプレー（ボレー、スマッシュ）",
      // ...以下同様にすべてのchildrenを記述(省略せず貼り付ける)...
      children: [
        {
          name: "(1) ボレー技術",
          children: [
            {
              name: "(a) 基本ボレー",
              children: [
                { name: "コンチネンタルグリップの安定" },
                { name: "体前でのコンパクトインパクト" },
                { name: "左右への素早い足運び" }
              ]
            },
            {
              name: "(b) ハイボレー、ローボレー",
              children: [
                { name: "ハイボレー（肩上での安定）" },
                { name: "ローボレー（膝曲げ重心下げ）" }
              ]
            },
            {
              name: "(c) コース・ペース管理",
              children: [
                { name: "当てるだけで相手パワー利用" },
                { name: "コースコントロール（クロス、ダウンザライン）" }
              ]
            },
            {
              name: "(d) ドライブボレー",
              children: [
                { name: "軽いスイングで前進力付与" },
                { name: "コート深くへの叩き込み" }
              ]
            }
          ]
        },
        {
          name: "(2) スマッシュ（オーバーヘッド）",
          children: [
            {
              name: "(a) 構え（トロフィーポーズ）と打点確保",
              children: [
                { name: "前方高い打点確保" },
                { name: "肩・肘・手首連動" }
              ]
            },
            {
              name: "(b) バックペダル動作",
              children: [
                { name: "後方への素早いクロスステップ" }
              ]
            },
            {
              name: "(c) コース選択",
              children: [
                { name: "相手位置把握" },
                { name: "広角打ち分け" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "サーブの種類（フラット、スライス、スピン）",
      children: [
        {
          name: "(1) サーブフォーム・トス",
          children: [
            {
              name: "(a) トス位置調整",
              children: [
                { name: "フラット用（前方高く）" },
                { name: "スピン用（後頭部上方）" },
                { name: "スライス用（体の外側）" }
              ]
            },
            {
              name: "(b) 膝屈伸・体重移動",
              children: [
                { name: "膝の曲げ伸ばしでパワー伝達" },
                { name: "前方重心移動・ジャンプ" }
              ]
            }
          ]
        },
        {
          name: "(2) フラットサーブ",
          children: [
            {
              name: "(a) 最大スピード追求",
              children: [
                { name: "手首スナップ、力伝達スムーズさ" }
              ]
            },
            {
              name: "(b) コース設定",
              children: [
                { name: "Tコースへの直球" },
                { name: "ボディサーブで相手動きを制限" }
              ]
            }
          ]
        },
        {
          name: "(3) スライスサーブ",
          children: [
            {
              name: "(a) 回転付与",
              children: [
                { name: "ラケット面を外側に擦るスイング" }
              ]
            },
            {
              name: "(b) ワイド展開",
              children: [
                { name: "相手をコート外へ引き出す" }
              ]
            }
          ]
        },
        {
          name: "(4) スピンサーブ（キックサーブ）",
          children: [
            {
              name: "(a) スイングパス",
              children: [
                { name: "下から上への擦り上げ高く弾む" }
              ]
            },
            {
              name: "(b) セカンドサーブ安定策",
              children: [
                { name: "ネットクリアランス高めでミス減" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "リターンの技術",
      children: [
        {
          name: "(1) 準備・スタンス",
          children: [
            {
              name: "(a) レディポジション",
              children: [
                { name: "足幅、膝曲げ、前傾保持" }
              ]
            },
            {
              name: "(b) スプリットステップ",
              children: [
                { name: "相手インパクト直前の軽いジャンプ" }
              ]
            }
          ]
        },
        {
          name: "(2) サーブコース・スピン対応",
          children: [
            {
              name: "(a) ボディサーブ対策",
              children: [
                { name: "サイドステップで回避" }
              ]
            },
            {
              name: "(b) スピンサーブ対応",
              children: [
                { name: "高弾道球への位置調整（後退or早打ち）" }
              ]
            }
          ]
        },
        {
          name: "(3) 攻守選択",
          children: [
            {
              name: "(a) ブロックリターン（守備的）",
              children: [
                { name: "当てるだけで返球" }
              ]
            },
            {
              name: "(b) 攻撃的リターン",
              children: [
                { name: "弱いセカンドサーブを叩き込む" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "特殊ショット（ドロップショット、ロブ）",
      children: [
        {
          name: "(1) ドロップショット",
          children: [
            {
              name: "(a) 相手位置・シチュエーション把握",
              children: [
                { name: "相手後方時に有効" }
              ]
            },
            {
              name: "(b) スピンコントロール（バックスピン）",
              children: [
                { name: "弾みを抑える打球" }
              ]
            },
            {
              name: "(c) タッチ・フィーリング",
              children: [
                { name: "柔らかい力加減" }
              ]
            }
          ]
        },
        {
          name: "(2) ロブ",
          children: [
            {
              name: "(a) ディフェンシブロブ",
              children: [
                { name: "高く深いロブで時間稼ぎ" }
              ]
            },
            {
              name: "(b) 攻撃的ロブ",
              children: [
                { name: "相手頭上を抜く" }
              ]
            },
            {
              name: "(c) 高さ・深さ調整",
              children: [
                { name: "相手陣形に合わせた軌道変化" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "フットワーク、動き、ポジショニング",
      children: [
        {
          name: "(1) スプリットステップと初動",
          children: [
            {
              name: "(a) タイミング練習",
              children: [
                { name: "相手インパクトに同期" }
              ]
            }
          ]
        },
        {
          name: "(2) 前後左右への移動",
          children: [
            {
              name: "(a) ステップバリエーション",
              children: [
                { name: "サイドステップ" },
                { name: "クロスステップ" },
                { name: "シャッフルステップ" }
              ]
            },
            {
              name: "(b) 重心移動と安定",
              children: [
                { name: "バランス保持" }
              ]
            }
          ]
        },
        {
          name: "(3) コートカバレッジとリカバリー",
          children: [
            {
              name: "(a) 撃球後の復帰",
              children: [
                { name: "ニュートラルポジションへの素早い戻り" }
              ]
            },
            {
              name: "(b) 相手パターンへの位置調整",
              children: [
                { name: "クロス傾向時オフセンターポジション" }
              ]
            }
          ]
        }
      ]
    }
  ]

  async function createCategories(tree: CategorySeed[], parentId?: number) {
    for (const node of tree) {
      const created = await prisma.category.create({
        data: {
          name: node.name,
          parentId: parentId
        }
      })

      // created.idがbigintの場合、以下のようにparseIntでnumberに変換
      const createdId = parseInt(created.id.toString(), 10)

      if (node.children && node.children.length > 0) {
        await createCategories(node.children, createdId)
      }
    }
  }

  const techAndSkillsId = parseInt(techAndSkills.id.toString(), 10)
  await createCategories(techAndSkillsTree, techAndSkillsId)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })