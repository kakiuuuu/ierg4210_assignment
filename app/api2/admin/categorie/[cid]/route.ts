import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';

export async function PUT(
  request: Request,
  { params }: { params: { cid: number } }
) {
  try {
    let cid = Number(params.cid)
    const body = await request.json();
    const { name } = body
    const putCategrie = await prisma.categorie.update({
      where: { cid },
      data: { name }
    })
    return NextResponse.json(putCategrie);
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { cid: number } }
) {
  try {
    let cid = Number(params.cid)
    const deleteCategrie = await prisma.categorie.delete({
      where: { cid },
    })
    return NextResponse.json(deleteCategrie);
  } catch (error) {
    return NextResponse.json(error)
  }
}

