import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/prisma/client';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.query.pid) throw new Error('????')
    let pid = Number(req.query.pid)
    const productsRc = await prisma.product.findUnique({
      where: {
        pid
      },
      include: {
        categorie: true,
      },
    })
    return res.status(200).json(productsRc)
  } catch (error) {
    return res.status(500).json(error)
  }
}
