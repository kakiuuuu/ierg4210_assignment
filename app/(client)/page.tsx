import ProductList from './(component)/ProductList'
import { prisma } from '@/prisma/client';
import type { Product } from '@/typings'


async function getProducts() {
  const products: Product[] = await prisma.product.findMany()
  return products
}

export default async function Home() {
  const products = await getProducts()
  return (
    <main className='clientPageMain'>
      <h3>Home</h3>
      <ProductList products={products} />
    </main>
  )
}

export const revalidate = 10