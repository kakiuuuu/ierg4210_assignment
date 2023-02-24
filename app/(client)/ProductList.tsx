'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/typings'

interface Props {
  products: Product[];
}

export default function ProductList(props: Props ) {
  const {products}: {products: Product[] }= props 
  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
  }
  return (
    <div className="productList">
      <h3>Home</h3>
      <div className="productsGrid">
        {products?.map((product) => {
          return (
            <Link key={product.pid}
              href={`/products/${product.pid}`}
              className={"card"}
            >
              <Image src={product.image} width={236} height={142} alt={product.name} />
              <h2>
                {product.name}
              </h2>
              <p>
                ${product.price}
              </p>
              <button onClick={onClickHandler}>Add to cart</button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// export default ProductList