import stylesScss from './adminPage.module.scss'
import stylesCss from './adminPage.module.css'
import './adminPage.module.scss'
import './adminPage.module.css'

export default async function AdminPage() {
  // const products: Product[] = await getProducts()
  return (
    <main className={stylesCss.testmain}>
      <p className={stylesScss.testmain2}>123123</p>
      <p className={'testmain'}>123123</p>
      hello admin
    </main>
  )
}
