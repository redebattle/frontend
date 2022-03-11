/* eslint-disable react/react-in-jsx-scope */
import { ToastProvider } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress'

import * as gtag from '../lib/gtag'

import '../styles/tailwind.css'
import '../styles/globals.css'
import '../styles/nprogress.css'
import 'next-pagination/dist/index.css'

import { AuthProvider } from '../contexts/AuthContext'

import Layout from '../components/Layout'
import Analytics from '../components/Analytics'
import ScrollToTheTopButton from '../components/ScrollButton'
import { AnimateSharedLayout } from 'framer-motion'

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

    router.events.on('routeChangeStart', () => NProgress.start())
    router.events.on(
      'routeChangeComplete',
      () => NProgress.done(),
      handleRouteChange
    )
    router.events.on('routeChangeError', () => NProgress.done())
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
