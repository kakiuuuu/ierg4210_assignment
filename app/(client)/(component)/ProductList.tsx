'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/typings'
import AddToCart from './AddToCart'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { usePathname } from 'next/navigation'

type Props = {
  products?: Product[];
}

export default function ProductList(props: Props) {
  const pathname = usePathname()
  const [products, setProducts] = useState<Product[]>(props.products || [])

  async function getProducts() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api2/product`)
    const results:Product[] = await response.json();
    setProducts((prev) => [...prev, ...results]);
  }
  return (

    <InfiniteScroll
      dataLength={products?.length || 0}
      next={getProducts}
      hasMore={pathname === '/'}
      loader={<h4>Loading...</h4>}
    >
      <div className="productsGrid">

        {products?.map((product, i) => {
          return (
            <div className="card" key={product.pid * 1000 + i}>
              <Link href={`/product/${product.pid}`}>
                <Image src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${product.image}`} width={236} height={142} alt={product.name} />
                <h2>{product.name}</h2>
                <p>${product.price}</p>
                <AddToCart product={product} />
              </Link>
            </div>
          )
        })}
      </div>
    </InfiniteScroll>
  )
}
