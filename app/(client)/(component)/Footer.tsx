import Link from "next/link"

const Footer = () => {
  return (
    <footer className={"footer"}>
      Ka Kiu Fong
      1155143596
      <Link href={'/admin'}>Admin Panel</Link>
    </footer>
  )
}

export default Footer