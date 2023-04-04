import { notFound } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/typings'
import AddToCart from '../../(component)/AddToCart'
import { prisma } from '@/prisma/client';

type Props = {
  params: {
    pid: number
  }
}

async function getProduct(pid: any) {
  pid = Number(pid)
  const product = await prisma.product.findUnique({
    where: { pid },
    include: {
      categorie: true,
    },
  })
  return product
}

const ProductPage = async (props: Props) => {
  const { params: { pid } } = props
  const product = await getProduct(pid)
  if (!product) {
    notFound();
  }
  return (
    <main className='clientPageMain'>
      <h3>
        <Link href={'/'}>Home</Link>
        {' > '}
        <Link href={`/categorie/${product.cid}`}>{product.categorie?.name}</Link>
        {' > '}
        <Link href={`/product/${product.pid}`}>{product.name}</Link>
      </h3>
      <div className='productDetail'>
        <Image src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${product.image}`} width={531} height={324} alt={product.name} className='productImage' />
        <h2>{product.name}</h2>
        <p className='desc'>{product.desc}</p>
        <h4 className='inventory'>
          Inventory : {(product.inventory > 3) ? product.inventory : `Only ${product.inventory} Left!`}
        </h4>
        <h4 className='price'>${product.price}</h4>
        <AddToCart product={product}/>
      </div>
    </main >
  )
}

export default ProductPage

export async function generateStaticParams() {
  const products: Product[] = await prisma.product.findMany()
  return products.map((product) => ({ pid: product.pid.toString() }))
}

export const revalidate = 60
