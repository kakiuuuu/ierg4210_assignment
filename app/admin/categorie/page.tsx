import type { Product, Categorie } from '@/typings'
import AddButton from '../AddButton';
import CategorieTable from './CategorieTable';
async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/api2/categorie`, { cache:'no-cache'  })
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json()
  return data
}

export default async function ProductPage() {
  const categoriesData =  getCategories()
  const [categories]:[Categorie[]] = await Promise.all([categoriesData])

  return (
    <main>
      <h3>Categorie</h3>
      <CategorieTable categories={categories}/>
    </main>
  )
}
