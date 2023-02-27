import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';

export async function PUT(
  request: Request,
  { params }: { params: { pid: number } }
) {
  try {
    let pid = Number(params.pid)
    const body = await request.json();
    const putProduct = await prisma.product.update({
      where: { pid },
      data: {
        name: body.name,
        cid: Number(body.cid),
        desc: body.desc,
        inventory: Number(body.inventory),
        price: Number(body.price),
        image: body.image
      }
    })
    return NextResponse.json(putProduct);
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { pid: number } }
) {
  try {
    let pid = Number(params.pid)
    const deleteProduct = await prisma.product.delete({
      where: { pid },
    })
    return NextResponse.json(deleteProduct);
  } catch (error) {
    return NextResponse.json(error)
  }
}

