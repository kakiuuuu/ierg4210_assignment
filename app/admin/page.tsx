import type { Product, Categorie } from '@/typings'
import Link from 'next/link';
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
export default async function AdminPage() {
  const productsPromise = getProducts()
  const categoriesPromise = getCategories()
  const [products, categories] = await Promise.all([productsPromise, categoriesPromise])

  return (
    <main className='adminPageMain'>
      <h3>Dashboard</h3>
      <div className="sectionContainer">
        <Link href={'/admin/product'}>
          <section>
            <h4>Products List</h4>
            {products?.map((product) => {
              return (
                <div key={product.pid}>
                  <span>{product.name}</span> -------- Inventory: <span>{product.inventory}</span>
                </div>
              );
            })}
          </section>
        </Link>
        <Link href={'/admin/categorie'}>
          <section>
            <h4>Categories List</h4>
            {categories?.map((categorie) => {
              return (
                <div key={categorie.cid}>
                  <p>{categorie.name}</p>
                </div>
              );
            })}
          </section>
        </Link>
      </div>
    </main >
  )
}

export const revalidate = 10