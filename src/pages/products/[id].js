import Image from 'next/image'
import Link from 'next/link'
import Sidebar from '../../components/Sidebar'
import getDummyData from '../../data'

const ProductPage = (props) => {
  const { product } = props
  const onClickHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div >
      {/* <Sidebar /> */}
      <h3>
        <Link href={'/'}>Home</Link>
        {' > '}
        <Link href={'/'}>Category1</Link>
        {' > '}
        <Link href={`/products/${product.productId}`}>{product.name}</Link>
      </h3>
      <div className='productDetail'>
        <Image src={product.image} width={531} height={324} alt={product.name} className='productImage' />
        <h2>
          {product.name}
        </h2>
        <p className='desc'>
          {product.desc}
        </p>
        <h4 className='inventory' inventory={product.inventory}>
          Inventory : {(product.inventory > 3) ? product.inventory : `Only ${product.inventory} Left!`}
        </h4>
        <h4 className='price'>
          ${product.price}
        </h4>
        <button onClick={onClickHandler}>Add to cart</button>
      </div>
    </div >
  )
}

export default ProductPage

export async function getStaticPaths() {
  const products = getDummyData()
  const paths = products.map((product) => {
    return {
      params: { id: product.productId }
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const products = getDummyData()
  const [product] = products.filter((product) => product.productId === context.params.id)
  return {
    props: { product },
  }
}