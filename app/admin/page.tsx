import type { Product, Categorie } from '@/typings'

export const metadata = {
  title: 'Admin Panel',
  description: 'The admin panel to manage the eshop'
}

async function getProducts() {
  const res = await fetch(`${process.env.BASE_URL}/api/Product`, { next: { revalidate: 400 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json()
  return data
}
async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/api/Categorie`, { next: { revalidate: 400 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json()
  return data
}

export default async function AdminPage() {
  const products: Product[] = await getProducts()
  const categories: Categorie[] = await getCategories()

  return (
    <main>
      <h3>Dashboard</h3>
      <div className="sectioncontainer">
        <section>
          <h4>Products List</h4>
          {/* <AddButton /> */}
          {products.map((product) => {
            return (
              <div key={product.pid}>
                <p>{product.name}</p>
              </div>
            );
          })}
        </section>
        <section>
          <h4>Categories List</h4>
          {/* <AddButton /> */}
          {categories.map((categorie) => {
            return (
              <div key={categorie.cid}>
                <p>{categorie.name}</p>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  )
}
