import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';


export async function GET(
  req: Request,
) {
  try {
    const categorieRc = await prisma.categorie.findMany()
    return NextResponse.json(categorieRc);
  } catch (error) {
    return NextResponse.json(error)
  }
}

export const revalidate = 10
