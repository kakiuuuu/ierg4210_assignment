import { Categorie } from '@/typings';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

import { prisma } from '@/prisma/client';
import { includes } from 'lodash';


export async function GET(
  req: NextApiRequest,
  {params} : {params:{pid:number}}
) {
  try {
    const pid = Number(params.pid)
    const productsRc = await prisma.product.findUnique({
      where:{pid},
      include:{
        categorie: true
      }
    })
    return NextResponse.json(productsRc);
  } catch (error) {
    return NextResponse.json(error)
  }
}
