'use client'
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/reducer'
import type { Product } from '@/typings'
type Props = {
  product: Product,
}

const AddToCart = ({ product }: Props) => {
  const dispatch = useAppDispatch()
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({
      pid: product.pid,
      quantity: 1,
      name: product.name,
      price: product.price
    }))
  }

  return (
    <button onClick={handleClick}>Add to cart</button>
  )
}

export default AddToCart