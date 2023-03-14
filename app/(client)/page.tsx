import ProductList from './(component)/ProductList'
import { prisma } from '@/prisma/client';
import type { Product } from '@/typings'

export const metadata = {
  title: 'Shopping App',
  description: 'A shopping website that sell cat food'
}

async function getProducts() {
  const products: Product[] = await prisma.product.findMany()
  return products
}

export default async function Home() {
  const products = await getProducts()
  return (
    <main>
      <h3>Home</h3>
      <ProductList products={products} />
    </main>
  )
}
