import prisma from '@/prisma/client';
import { Order } from '@/typings';
import OrderTable from '../../../admin/order/OrderTable';
type Props = {
  params: { uid: string }
}

async function getOrder(uid: string) {
  const orderRc = await prisma.order.findMany({
    where: { uid: Number(uid) },
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
  })
  return orderRc
}

const UserPage = async ({params} : Props) => {
  const orders = await getOrder(params.uid)
  return (
    <main className='clientPageMain'>
      <OrderTable orders={orders} />
    </main>
  )
}

export default UserPage
