/* eslint-disable react/react-in-jsx-scope */
import '../styles/tailwind.css'
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { AnimateSharedLayout } from 'framer-motion'
import { ToastProvider } from 'react-toast-notifications'

const ViewportMetaLink = () => (
  <meta
    name="viewport"
    content="minimum-scale=1, initial-scale=1.0, width=device-width"
    key="viewport-meta"
  />
)

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AnimateSharedLayout>
        <Layout>
          <ToastProvider>
            <AuthProvider>
              <ViewportMetaLink />
              <Component {...pageProps} />
            </AuthProvider>
          </ToastProvider>
        </Layout>
      </AnimateSharedLayout>
    </>
  )
}

export default MyApp
