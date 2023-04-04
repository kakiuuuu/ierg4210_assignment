import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    let id = Number(params.id)
    const body = await request.json();
    const { username } = body
    const putCategrie = await prisma.user.update({
      where: { id },
      data: { username }
    })
    return NextResponse.json(putCategrie);
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    let id = Number(params.id)
    const deleteCategrie = await prisma.user.delete({
      where: { id },
    })
    return NextResponse.json(deleteCategrie);
  } catch (error) {
    return NextResponse.json(error)
  }
}

