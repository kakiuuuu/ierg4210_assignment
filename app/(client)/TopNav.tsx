import Link from 'next/link'
import type { Categorie } from '@/typings'


async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/api2/categorie`, { next: { revalidate: 20 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json()
  return data
}

export default async function TopNav() {
  const categories: Categorie[] = await getCategories()
  return (
    <nav>
      <ul className="navBar">
        <Link href={"/"}><li className={"li"}>All</li></Link>
        {categories.map((categorie) => (
          <Link href={`/categories/${categorie.cid}`} key={categorie.cid}><li className={"li"}>{categorie.name}</li></Link>
        ))}
      </ul>
    </nav>
  )
}