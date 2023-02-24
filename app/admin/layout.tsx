import '@/styles/globals.scss'
import './adminPage.module.scss'
// import Header from './Header'
// import Footer from './Footer'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* <Header /> */}
          {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
