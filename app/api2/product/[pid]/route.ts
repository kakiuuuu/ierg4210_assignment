import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

import { prisma } from '@/prisma/client';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { pid: number } }
) {
  try {
    const pid = Number(params.pid)
    const productRc = await prisma.product.findUnique({
      where: { pid },
      include: {
        categorie: true
      }
    })
    return NextResponse.json(productRc);
  } catch (error) {
    return NextResponse.json(error)
  }
}
