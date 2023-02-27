import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();
    const putProduct = await prisma.product.create({
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
    console.log("fuch UOUUUUUUUU",error)
    return NextResponse.json(error)
  }
}