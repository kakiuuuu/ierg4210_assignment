'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/typings'

type Props = {
  products?: Product[];
}

export default function ProductList(props: Props) {
  const { products } = props
  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
  }
  return (
    <div className="productsGrid">
      {products?.map((product) => {
        return (
          <div className="card" key={product.pid}>
            <Link href={`/product/${product.pid}`}>
              <Image src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${product.image}`} width={236} height={142} alt={product.name} />
              <h2>{product.name}</h2>
              <p>${product.price}</p>
              <button onClick={onClickHandler}>Add to cart</button>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
