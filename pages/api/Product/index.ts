import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/prisma/client';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const productsRc = await prisma.prduct.findMany({
      include: {
        categorie: true,
      },
    })
    return res.status(200).json(productsRc)
  } catch (error) {
    return res.status(500).json(error)
  }
}
