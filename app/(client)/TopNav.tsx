import Link from 'next/link'
import './page.module.scss'
import styles from './page.module.scss'
import type { Categorie } from '@/typings'


async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/api/Categorie`, { next: { revalidate: 20 } })
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
      <ul className={styles.navBar}>
        <Link href={"/"}><li className={"li"}>All</li></Link>
        {categories.map((categorie) => (
          <Link href={"/"} key={categorie.cid}><li className={"li"}>{categorie.name}</li></Link>
        ))}
      </ul>
    </nav>
  )
}