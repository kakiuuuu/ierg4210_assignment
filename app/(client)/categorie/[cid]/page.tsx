import ProductList from '../../(component)/ProductList'
import Link from 'next/link'
import type { Categorie } from '@/typings'
import { notFound } from 'next/navigation'
import { prisma } from '@/prisma/client';

type Props = {
  params: {
    cid: number
  }
}

async function getCategorie(cid: number) {
  cid = Number(cid)
  const categorie = await prisma.categorie.findUnique({
    where: { cid },
    include: {
      products: true,
    },
  })
  return categorie
}

export default async function Categorie(props: Props) {
  const { params: { cid } } = props
  const categorie = await getCategorie(cid)
  if (!categorie) {
    notFound();
  }
  const { products } = categorie
  return (
    <main className='clientPageMain'>
      <h3>
        <Link href={'/'}>Home</Link>
        {' > '}
        <Link href={`/categorie/${categorie.cid}`}>{categorie.name}</Link>
      </h3>
      <ProductList products={products} />
    </main>
  )
}

export async function generateStaticParams() {
  const categories = await prisma.categorie.findMany()
  return categories.map((categorie) => ({ cid:categorie.cid.toString()}))
}

export const revalidate = 60
