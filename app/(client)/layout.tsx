import '@/styles/globals.scss'
import '@/styles/general.scss'
import Header from './Header'
import Footer from './Footer'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  )
}
