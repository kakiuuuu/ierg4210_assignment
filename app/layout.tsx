import '@/styles/globals.scss'
import AppProvider from './provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AppProvider>
        {children}
      </AppProvider>
    </html>
  )
}
