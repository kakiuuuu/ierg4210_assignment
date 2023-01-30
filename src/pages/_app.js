import '../styles/general.scss'
import '../styles/globals.scss'
import AppLayout from '../components/layout/AppLayout.js';


export default function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
