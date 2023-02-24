import ProductList from '../../ProductList'
import Link from 'next/link'
import type { Categorie, Product } from '@/typings'

type Props = {
  params: {
    cid: number
  }
}

async function getProductsByCid(cid: number) {
  const res = await fetch(`${process.env.BASE_URL}/api/Categorie/${cid}`, { next: { revalidate: 600 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const categorie: Categorie = await res.json()
  return categorie
}

export default async function Categorie(props: Props) {
  const { params: { cid } } = props
  const categorie = await getProductsByCid(cid)
  const { products } = categorie
  return (
    <main>
      <h3>
        <Link href={'/'}>Home</Link>
        {' > '}
        <Link href={`/categories/${categorie.cid}`}>{categorie.name}</Link>
      </h3>
      <ProductList products={products} />
    </main>
  )
}
