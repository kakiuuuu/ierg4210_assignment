import { Categorie } from '@/typings';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

import { prisma } from '@/prisma/client';


export async function GET(
  req: NextApiRequest,
) {
  try {
    const categorieRc = await prisma.categorie.findMany()
    return NextResponse.json(categorieRc);
  } catch (error) {
    return NextResponse.json(error)
  }
}
