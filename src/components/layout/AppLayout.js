import Header from './Header'
import Footer from './Footer'
const AppLayout = (props) => {
  const { children } = props
  return (
    <>
      <Header />
        <main className={"main"}>{children}</main>
      <Footer />
    </>
  )
}

export default AppLayout