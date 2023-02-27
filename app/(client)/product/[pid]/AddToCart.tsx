'use client'
import React from 'react'

type Props = {}

const AddToCart = (props: Props) => {
  const onClickHandler = (e:React.MouseEvent) => {
    e.preventDefault();
  }
  return (
    <button onClick={onClickHandler}>Add to cart</button>
  )
}

export default AddToCart