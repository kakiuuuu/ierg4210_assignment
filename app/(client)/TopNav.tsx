import Link from 'next/link'
import type { Categorie } from '@/typings'
import { prisma } from '@/prisma/client';


async function getCategories() {
  const categories = await prisma.categorie.findMany()
  return categories
}

export default async function TopNav() {
  const categories: Categorie[] = await getCategories()
  return (
    <nav>
      <ul className="navBar">
        <Link href={"/"}><li className={"li"}>All</li></Link>
        {categories.map((categorie) => (
          <Link href={`/categorie/${categorie.cid}`} key={categorie.cid}><li className={"li"}>{categorie.name}</li></Link>
        ))}
      </ul>
    </nav>
  )
}