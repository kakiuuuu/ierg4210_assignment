import React, { useRef, useState } from 'react';
import TopNav from './TopNav'
import Image from 'next/image'
import Link from 'next/link'

const cartItem = [
  {
    name: "Product 1",
    quantity: 2,
    price: 1
  },
  {
    name: "Product 2",
    quantity: 3,
    price: 2
  }
]
const Header = () => {
  return (
    <header className="header">
      <Link href={"/"}>
        <Image src={"/favicon.ico"} width={60} height={60} alt={'logo'} />
      </Link>
      {/* @ts-ignore */}
      <TopNav />
      <div className="shoppingCart">
        Shopping Cart
        <div className="cartList">
          <h4>Shopping Cart ( Total: $8 )</h4>
          {cartItem.map((item, i) => (
            <>
              <hr />
              <div key={item.name} className="cartItem">
                <span>{item.name}</span>
                <input autoFocus type='number' placeholder={`${item.quantity}`} />
                <span>@${item.price}</span>
              </div>
            </>
          ))}
          <button>CheckOut</button>
        </div>
      </div>

    </header>
  )
}

export default Header