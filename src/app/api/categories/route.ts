// たとえば src/app/api/categories/route.ts と仮定
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: { children: true }
  })
  
  return NextResponse.json({ status: 'success', data: categories })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ status: 'error', message: 'Invalid category name' }, { status: 400 })
    }

    const created = await prisma.category.create({
      data: { name }
    })

    return NextResponse.json({ status: 'success', data: created }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating category:', error)
    return NextResponse.json({ status: 'error', message: 'Failed to create category' }, { status: 500 })
  }
}