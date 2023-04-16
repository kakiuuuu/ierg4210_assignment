import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';
import * as bcrypt from 'bcrypt';

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    let id = Number(params.id)
    const body = await request.json();
    const { username, pw } = body
    const hashedPassword = await bcrypt.hash(pw, 10);
    const putCategrie = await prisma.user.update({
      where: { id },
      data: {
        username,
        pw: hashedPassword,
      }
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

