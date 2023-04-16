import type { Order } from '@/typings'
import OrderTable from './OrderTable';
import { prisma } from '@/prisma/client';

async function getOrders() {
  const orders: Order[] = await prisma.order.findMany(
    {
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                price: true
              }
            }
          }
        }
      }
    }
  )
  return orders
}

export default async function OrderPage() {
  const orders = await getOrders()

  return (
    <main className='adminPageMain'>
      <h3>Order</h3>
      <OrderTable orders={orders} />
    </main>
  )
}

export const revalidate = 5
