import Link from 'next/link'

export default function SideBar(props) {
  const { products } = props
  return (
    <aside>
      <nav>
        <ul className={"productCatList"}>
          <h3>Category</h3>
          <Link href={"/"}><li className={"li"}>All</li></Link>
          <Link href={"/"}><li className={"li"}>Category1</li></Link>
          <Link href={"/"}><li className={"li"}>Category2</li></Link>
          <Link href={"/"}><li className={"li"}>Category3</li></Link>
        </ul>
      </nav>
    </aside>
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