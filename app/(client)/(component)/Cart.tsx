'use client'
import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectCart, removeFromCart, changeQuantity, getTotalPrice, cleanCart } from '@/store/reducer/cart'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { selectUser } from '@/store/reducer/user';

const initialOptions = {
  "client-id": process.env.NEXT_PUBLIC_CLIENT_ID!,
  currency: "HKD",
};


const Cart = () => {
  const totalPrice = useAppSelector(getTotalPrice)
  const cartItems = useAppSelector(selectCart)
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [paidFor, setPaidFor] = useState(false)
  const [loaded, setloaded] = useState(false)

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
              )
            })}
            <p>Total : ${totalPrice}</p>
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                style={{ layout: 'horizontal', tagline: false, color : "silver"}}
                forceReRender={[cartItems]}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        description: 'Your order',
                        amount: {
                          value: totalPrice,
                            breakdown: {
                            item_total: {
                              value: totalPrice,
                              currency_code: 'HKD',
                            },
                          }
                        },
                        items: cartItems.map((item) => {
                          // console.log('item>>>', item)
                          return {
                            sku: item.pid.toString(),
                            name: item.name,
                            unit_amount: {
                              value: item.price.toString(),
                              currency_code: 'HKD',
                            },
                            quantity: item.quantity.toString(),
                          }
                        })
                      },
                    ]

                  })
                }}
                onApprove={async (data, actions) => {
                  if (actions.order)
                    return actions.order.capture().then(async function (details: any) {
                      console.log('data>>>>>', data)
                      console.log('details>>>>>', details)
                      const orderRc = await fetch('/api/order', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          uid: user?.id ?? 3,
                          item: details.purchase_units[0].items,
                          date: details.update_time,
                          totalPrice: details.purchase_units[0].amount.value,
                          status: details.status,
                        }),
                      })

                      alert('Transaction completed by ' + details.payer.name.given_name);

                      setPaidFor(true)
                      dispatch(cleanCart())
                    });
                  return Promise.reject();
                }}
              />
            </PayPalScriptProvider>
          </>
        )}
      </div>
    </div>

  )
}


export default Cart