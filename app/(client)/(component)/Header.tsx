import TopNav from './TopNav'
import Image from 'next/image'
import Link from 'next/link'
import Cart from './Cart'


const Header = () => {
  return (
    <header className="header">
      <Link href={"/"}>
        <Image src={"/favicon.ico"} width={60} height={60} alt={'logo'} />
      </Link>
      {/* @ts-ignore */}
      <TopNav />
      <Cart />
    </header>
  )
}

export default Header