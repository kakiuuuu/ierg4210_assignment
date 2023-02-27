import ProductList from './ProductList'
import type { Product } from '@/typings'

export const metadata = {
  title: 'Shopping App',
  description: 'A shopping website that sell cat food'
}

async function getProducts() {
  const res = await fetch(`${process.env.BASE_URL}/api2/product`, { next: { revalidate: 60 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json()
  return data
}

export default async function Home() {
  const products: Product[] = await getProducts()
  return (
    <main>
      <h3>Home</h3>
      <ProductList products={products} />
    </main>
  )
}
