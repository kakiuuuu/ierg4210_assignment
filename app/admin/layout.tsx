import '@/styles/adminPanel.scss'
import SideBar from './SideBar'

export const metadata = {
  title: 'Admin Panel',
  description: 'The admin panel to manage the eshop'
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='adminPageBody'>
      <SideBar />
      {children}
    </div>
  )
}
