import type { Categorie } from '@/typings'
import CategorieTable from './CategorieTable';

async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/api2/categorie`, { next: { revalidate: 60 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const categories: Categorie[] = await res.json()
  return categories
}

export default async function CategoriePage() {
  const categories = await getCategories()

  return (
    <main>
      <h3>Categorie</h3>
      <CategorieTable categories={categories} />
    </main>
  )
}
