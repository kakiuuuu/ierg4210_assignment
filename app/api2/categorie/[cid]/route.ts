import { Categorie } from '@/typings';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

import { prisma } from '@/prisma/client';
import { includes } from 'lodash';


export async function GET(
  req: NextApiRequest,
  {params} : {params:{cid:number}}
) {
  try {
    const cid = Number(params.cid)
    const categorieRc = await prisma.categorie.findUnique({
      where:{cid},
      include:{
        products: true
      }
    })
    return NextResponse.json(categorieRc);
  } catch (error) {
    return NextResponse.json(error)
  }
}
