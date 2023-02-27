import type { Product, Categorie } from '@/typings'
import Link from 'next/link';

export const metadata = {
  title: 'Admin Panel',
  description: 'The admin panel to manage the eshop'
}

async function getProducts() {
  const res = await fetch(`${process.env.BASE_URL}/api2/product`, { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json()
  return data
}
async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/api2/categorie`, { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json()
  return data
}

export default async function AdminPage() {
  const productsData = getProducts()
  const categoriesData = getCategories()
  const [products, categories]: [Product[], Categorie[]] = await Promise.all([productsData, categoriesData])

  return (
    <main>
      <h3>Dashboard</h3>
      <div className="sectioncontainer">
        <Link href={'/admin/product'}>
          <section>
            <h4>Products List</h4>
            {products.map((product) => {
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
            {categories.map((categorie) => {
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
