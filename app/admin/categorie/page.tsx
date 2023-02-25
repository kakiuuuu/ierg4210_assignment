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

export default async function CategoriePage() {
  const products: Product[] = await getProducts()
  const categories: Categorie[] = await getCategories()

  return (
    <main>
      <h3>Categorie</h3>
      <section>
        <h4>Categorie List</h4>
        {/* <AddButton /> */}
        {categories.map((categorie) => {
          return (
            <div key={categorie.cid}>
              <p>{categorie.name}</p>
            </div>
          );
        })}
      </section>
    </main>
  )
}
