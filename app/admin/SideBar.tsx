import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const SideBar = (props: Props) => {
  return (
    <aside className="sideBar">
      <Image src={"/favicon.ico"} width={60} height={60} alt={'logo'} />
      {/* <hr />
      Admin Panel */}
      <hr />
      <nav>
        <ul>
          <Link href={"/admin"}><li>DashBoard</li></Link>
          <Link href={"/admin/product"}><li>Product</li></Link>
          <Link href={"/admin/categorie"}><li>Categorie</li></Link>
          <Link href={"/admin/user"}><li>User</li></Link>
          <Link href={"/"}><li>Go Back</li></Link>
        </ul>
      </nav>

    </aside>
  )
}

export default SideBar