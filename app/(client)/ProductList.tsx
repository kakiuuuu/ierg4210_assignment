'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/typings'

type Props = {
  products: Product[] | null;
}

export default function ProductList(props: Props) {
  const { products }: { products: Product[] | null } = props
  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
  }
  return (
    <div className="productsGrid">
      {products?.map((product) => {
        return (
          <div className="card" key={product.pid}>
            <Link href={`/products/${product.pid}`}>
              <Image src={product.image} width={236} height={142} alt={product.name} />
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
