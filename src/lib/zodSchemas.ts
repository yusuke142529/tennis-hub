import { z } from 'zod'

/** ユーザーサインアップ用スキーマ */
export const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters")
})

/** プロフィール編集用スキーマ */
export const profileSchema = z.object({
  display_name: z.string().min(1, "Display name is required"),
  bio: z.string().max(500, "Bio can be up to 500 chars").optional(),
  location: z.string().max(255, "Location too long").optional(),
  play_style: z.string().optional(),
  handedness: z.string().optional(),
  tennis_history: z.number().int().optional(),
  level_ntrp: z.number().optional(), // Decimal(2,1)は後で変換可
  preferred_shots: z.any().optional(), // JSONは任意の型を許容
  racket: z.string().optional(),
  privacy_setting: z.string().optional(),
  notification_setting: z.any().optional(),
  tennis_type_name: z.string().optional(),
  tennis_comment: z.string().optional(),
  tennis_image_url: z.string().url().optional()
})

/** カテゴリ作成・編集用スキーマ */
export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  parentId: z.number().int().optional()
})

/** 記事投稿・編集用スキーマ */
export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.any().optional(),
  categoryId: z.number().nullable().optional(),
  thumbnail: z.string().url().optional()
})

/** コメント作成用スキーマ */
export const commentSchema = z.object({
  post_id: z.number().int(),
  user_id: z.number().int(),
  parent_comment_id: z.number().int().optional(),
  content: z.string().min(1, "Comment cannot be empty")
})

/** フィードバック投稿用スキーマ */
export const feedbackSchema = z.object({
  postId: z.number().int(),
  helpful: z.boolean()
})