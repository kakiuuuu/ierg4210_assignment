import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';

export async function PUT(
  request: Request,
  { params }: { params: { uid: number } }
) {
  try {
    let uid = Number(params.uid)
    const body = await request.json();
    const { username } = body
    const putCategrie = await prisma.user.update({
      where: { uid },
      data: { username }
    })
    return NextResponse.json(putCategrie);
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { uid: number } }
) {
  try {
    let uid = Number(params.uid)
    const deleteCategrie = await prisma.user.delete({
      where: { uid },
    })
    return NextResponse.json(deleteCategrie);
  } catch (error) {
    return NextResponse.json(error)
  }
}

