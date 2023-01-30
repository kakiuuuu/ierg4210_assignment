import Link from 'next/link'

export default function TopNav(props) {
  const { products } = props
  return (
    <nav>
      <ul className="navBar">
        <Link href={"/"}><li className={"li"}>All</li></Link>
        <Link href={"/"}><li className={"li"}>Category1</li></Link>
        <Link href={"/"}><li className={"li"}>Category2</li></Link>
        <Link href={"/"}><li className={"li"}>Category3</li></Link>
      </ul>
    </nav>
  )
}

// export async function getServerSideProps(context) {
//   const products = getDummyData()
//   console.log('products', products)

//   return {
//     props: {
//       products
//     }
//   }
// }