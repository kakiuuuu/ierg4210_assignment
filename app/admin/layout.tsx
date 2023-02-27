import '@/styles/globals.scss'
import '@/styles/adminPanel.scss'
import SideBar from './SideBar'
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
