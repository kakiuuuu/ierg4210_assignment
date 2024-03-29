import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';

export async function GET(
  request: Request,
  { params }: { params: { uid: number } }
) {
  try {
    const uid = Number(params.uid)
    const orderRc = await prisma.order.findMany({
      where: { uid },
      // include: {
      //   products: true
      // }
    })
    return NextResponse.json(orderRc);
  } catch (error) {
    return NextResponse.json(error)
  }
}
