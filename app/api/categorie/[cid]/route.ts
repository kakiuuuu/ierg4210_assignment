import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';

export async function GET(
  request: Request,
  { params }: { params: { cid: number } }
) {
  try {
    const cid = Number(params.cid)
    const categorieRc = await prisma.categorie.findUnique({
      where: { cid },
      include: {
        products: true
      }
    })
    return NextResponse.json(categorieRc);
  } catch (error) {
    return NextResponse.json(error)
  }
}
