// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // globalThis.prismaが既に存在する場合はそちらを使う
  // 開発環境でHMR時に新たなクライアント生成を防ぐ
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV === 'development') globalThis.prisma = prisma

export default prisma