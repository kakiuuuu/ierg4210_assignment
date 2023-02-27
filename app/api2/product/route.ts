import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

import { prisma } from '@/prisma/client';


export async function GET(
  req: NextApiRequest,
) {
  try {
    const productsRc = await prisma.product.findMany({
      include: { categorie: true }
    })
    return NextResponse.json(productsRc);
  } catch (error) {
    return NextResponse.json(error)
  }
}
