import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/prisma/client';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const categoriesRc = await prisma.categorie.findMany()
    return res.status(200).json(categoriesRc)
  } catch (error) {
    return res.status(500).json(error)
  }
}
