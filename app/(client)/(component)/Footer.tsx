'use client'

import Link from "next/link"
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/reducer/user'

const Footer = () => {
  let user = useAppSelector(selectUser)
  return (
    <footer className={"footer"}>
      Ka Kiu Fong
      1155143596
      {user?.admin && <Link href={'/admin'}>Admin Panel</Link>}
    </footer>
  )
}

export default Footer