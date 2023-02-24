import { Inter } from '@next/font/google'
import styles from './page.module.scss'
import ProductList from './ProductList'
import type { Product } from '@/typings'

const inter = Inter({ subsets: ['latin'] })

async function getProducts() {
  const res = await fetch(`${process.env.BASE_URL}/api/Product`, { next: { revalidate: 20 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json()
  return data
}

export default async function Home() {
  const products: Product[] = await getProducts()
  return (
    <main className={styles.main}>
      <div className='PageContainer'>
        <h3>Home</h3>
        <ProductList products={products}/>
      </div>
    </main>
  )
}
