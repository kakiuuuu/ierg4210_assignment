import '@/styles/general.scss'
import Header from './(component)/Header'
import Footer from './(component)/Footer'

export const metadata = {
  title: 'Shopping App',
  description: 'A shopping website that sell cat food'
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className='clientPageBody'>
      <Header />
        {children}
      <Footer />
    </body>
  )
}
