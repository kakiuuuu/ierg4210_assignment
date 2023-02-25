import type { Product, Categorie } from '@/typings'
import AddButton from '../AddButton';

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

export default async function ProductPage() {
  const products: Product[] = await getProducts()
  const categories: Categorie[] = await getCategories()

  return (
    <main>
      <h3>Product</h3>
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
    </main>
  )
}
