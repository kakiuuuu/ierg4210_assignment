import type { Categorie } from '@/typings'
import CategorieTable from './CategorieTable';
import { prisma } from '@/prisma/client';

async function getCategories() {
  const categories: Categorie[]  = await prisma.categorie.findMany()
  return categories
}

export default async function CategoriePage() {
  const categories = await getCategories()

  return (
    <main className='adminPageMain'>
      <h3>Categorie</h3>
      <CategorieTable categories={categories} />
    </main>
  )
}

export const revalidate = 0
