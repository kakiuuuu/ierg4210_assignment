import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();
    console.log('body>>>>>>>', body)
    const postOrder = await prisma.order.create({
      data: {
        uid: Number(body.uid),
        date: body.date,
        total: Number(body.totalPrice),
      }
    })

    
    const postOrderItems = await prisma.orderItem.createMany({
      data: body.item.map((item: any) => {
        return {
          oid: postOrder.oid,
          pid: Number(item.sku),
          quantity: Number(item.quantity),
          status: body.status
        }
      })
    })


  return NextResponse.json({ mesage: 'success' });
} catch (error) {
  console.log("fuch UOUUUUUUUU", error)
  return NextResponse.json(error)
}
}