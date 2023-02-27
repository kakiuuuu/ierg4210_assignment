import ProductList from '../../ProductList'
import Link from 'next/link'
import type { Categorie } from '@/typings'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    cid: number
  }
}

async function getCategorie(cid: number) {
  const res = await fetch(`${process.env.BASE_URL}/api/categorie/${cid}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const categorie: Categorie = await res.json()
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
    <main>
      <h3>
        <Link href={'/'}>Home</Link>
        {' > '}
        <Link href={`/categorie/${categorie.cid}`}>{categorie.name}</Link>
      </h3>
      <ProductList products={products} />
    </main>
  )
}

// export async function generateStaticParams() {
//   const categoriesRes = await fetch(`${process.env.BASE_URL}/api/categorie`)
//   const categories: Categorie[] = await categoriesRes.json()

//   return categories.map((categorie) => ({ cid:categorie.cid.toString()}))
// }