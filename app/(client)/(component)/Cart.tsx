'use client'
import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectCart, removeFromCart, changeQuantity, getTotalPrice } from '@/store/reducer'

const Cart = () => {
  const totalPrice = useAppSelector(getTotalPrice)
  const cartItems = useAppSelector(selectCart)
  const dispatch = useAppDispatch()

  const handleRemoveItem = (pid: number) => {
    dispatch(removeFromCart(pid));
  };
  const handleQuantityChange = (pid: number, quantity: number) => {
    dispatch(changeQuantity({ pid, quantity }));
  }

  return (
    <div className="shoppingCart">
      Shopping Cart
      {cartItems.length > 0 && <div className='dot' >{cartItems.length}</div>}
      <div className="cartList">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => {
              return (
                <div key={item.pid} className="cartItem">
                  <span>{item.name}</span>
                  <input
                    type="number"
                    placeholder={`${item.quantity}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.pid, Number(e.target.value))} />
                  <span>@${item.price}</span>
                  <button onClick={() => handleRemoveItem(item.pid)}>Remove</button>
                </div>
                // <hr />
              )
            })}
            <p>Total : ${totalPrice}</p>
            <button>CheckOut</button>
          </>
        )}
      </div>
    </div>

  )
}


export default Cart