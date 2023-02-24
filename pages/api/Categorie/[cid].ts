import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/prisma/client';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let cid = Number(req.query.cid)
    const categorieRc = await prisma.categorie.findUnique({
      where: {
        cid
      },
      include: {
        products: true,
      },
    })
    return res.status(200).json(categorieRc)
  } catch (error) {
    return res.status(500).json(error)
  }
}
