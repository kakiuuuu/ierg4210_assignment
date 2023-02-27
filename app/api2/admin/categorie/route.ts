import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';

export async function POST(
  request: Request,
  { params }: { params: { cid: number } }
) {
  try {
    const body = await request.json();
    const { name } = body
    const putCategrie = await prisma.categorie.create({
      data: {
        name
      }
    })
    return NextResponse.json(putCategrie);
  } catch (error) {
    return NextResponse.json(error)
  }
}