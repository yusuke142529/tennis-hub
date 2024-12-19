// src/app/api/user/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// ユーザー一覧取得用例
export async function GET() {
  const users = await prisma.user.findMany({
    select:{id:true, email:true, email_verified_at:true, created_at:true, profile:true}
  })
  return NextResponse.json(users)
}