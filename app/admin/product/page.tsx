import type { Product, Categorie } from '@/typings'
import ProductTable from './ProductTable';
import { prisma } from '@/prisma/client';

async function getProducts() {
  const products: Product[] = await prisma.product.findMany({
    include: {
      categorie: true,
    },
  })
  return products
}
async function getCategories() {
  const categories: Categorie[]  = await prisma.categorie.findMany()
  return categories
}

export default async function ProductPage() {
  const productsData = getProducts()
  const categoriesData = getCategories()
  const [products, categories]: [Product[], Categorie[]] = await Promise.all([productsData, categoriesData])

  return (
    <main className='adminPageMain'>
      <h3>Product</h3>
      <ProductTable products={products} categories={categories} />
    </main>
  )
}

export const revalidate = 0
