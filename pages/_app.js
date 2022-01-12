/* eslint-disable react/react-in-jsx-scope */
import * as gtag from '../lib/gtag'
import '../styles/tailwind.css'
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/globals.css'
import Layout from '../components/Layout'
import Analytics from '../components/Analytics'
import { AnimateSharedLayout } from 'framer-motion'
import { ToastProvider } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ScrollToTheTopButton from '../components/ScrollToTheTopButton'
import 'next-pagination/dist/index.css'

const ViewportMetaLink = () => (
  <meta
    name="viewport"
    content="minimum-scale=1, initial-scale=1.0, width=device-width"
    key="viewport-meta"
  />
)

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <AnimateSharedLayout>
        <Layout>
          <ToastProvider>
            <AuthProvider>
              <ViewportMetaLink />
              <Component {...pageProps} />
              <Analytics />
              <ScrollToTheTopButton />
            </AuthProvider>
          </ToastProvider>
        </Layout>
      </AnimateSharedLayout>
    </>
  )
}

export default MyApp
