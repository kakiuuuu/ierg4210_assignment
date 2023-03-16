import '@/styles/globals.scss'
import '@/styles/adminPanel.scss'
import SideBar from './SideBar'

export const metadata = {
  title: 'Admin Panel',
  description: 'The admin panel to manage the eshop'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SideBar />
        {children}
      </body>
    </html>
  )
}
