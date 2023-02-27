import { notFound } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/typings'
import AddToCart from './AddToCart'

type Props = {
  params: {
    pid: number
  }
}

async function getProduct(pid: number) {
  const res = await fetch(`${process.env.BASE_URL}/api2/product/${pid}`, { next: { revalidate: 60 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const product: Product = await res.json()
  return product
}

const ProductPage = async (props: Props) => {
  const { params: { pid } } = props
  const product = await getProduct(pid)
  if (!product) {
    notFound();
  }
  return (
    <main >
      <h3>
        <Link href={'/'}>Home</Link>
        {' > '}
        <Link href={`/categorie/${product.cid}`}>{product.categorie?.name}</Link>
        {' > '}
        <Link href={`/product/${product.pid}`}>{product.name}</Link>
      </h3>
      <div className='productDetail'>
        <Image src={product.image} width={531} height={324} alt={product.name} className='productImage' />
        <h2>{product.name}</h2>
        <p className='desc'>{product.desc}</p>
        <h4 className='inventory'>
          Inventory : {(product.inventory > 3) ? product.inventory : `Only ${product.inventory} Left!`}
        </h4>
        <h4 className='price'>${product.price}</h4>
        <AddToCart />
      </div>
    </main >
  )
}

export default ProductPage

// export async function generateStaticParams() {
//   const productsRes = await fetch(`${process.env.BASE_URL}/api/product`)

//   const products: Product[] = await productsRes.json()
//   return products.map((product) => ({ pid: product.pid.toString() }))
// }
