import '@/styles/globals.scss'
import '@/styles/adminPanel.scss'
import SideBar from './SideBar'
import Header from './Header'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <Header /> */}
        <SideBar />
          {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
