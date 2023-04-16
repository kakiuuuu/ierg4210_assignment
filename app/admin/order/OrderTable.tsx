'use client'
import type { Order, OrderItem } from '@/typings'
import React, { useState } from 'react'
type Props = {
  orders: Order[]
}

export default function OrderTable({ orders }: Props) {
  const [selectedItem, setSelectedItem] = useState<Order | null>(null)
  return (
    <section>
      <h4>Order List</h4>
      <div style={{ display: "flex" }}>
        <table className='table'>
          <thead>
            <tr>
              <th>Operation</th>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => {
              return (
                <tr key={order.oid}>
                  <td><button onClick={() => setSelectedItem(order)}>Detail</button></td>
                  <td>{order.oid}</td>
                  <td>{order.date as string}</td>
                  <td>${order.total}</td>
                </tr>


              )
            })}
          </tbody>
        </table>

        {selectedItem &&
          <>
            <div style={{ margin: "2rem", backgroundColor: 'black', width: 1, height: 'auto' }} />
            <div>
              <h4>Detail of Order {selectedItem.oid}</h4>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItem?.orderItems?.map((item: OrderItem) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.product?.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.product?.price}</td>
                        <td>{item.status}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        }
      </div>
    </section>
  )
}