import { ChakraProvider, createLocalStorageManager, useMediaQuery } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import getConfig from 'next/config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import { useEffect, useMemo } from 'react'
import { NextSeo } from 'next-seo'
import Script from 'next/script'
import { WagmiConfig } from 'wagmi'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import 'react-toastify/dist/ReactToastify.css'
import '@/lib/fullpage/src/css/fullpage.css'

import { useLinguiInit } from '@/hooks/useLinguiInit'
import { pageview } from '@/utils/gtag'
import theme from '@/theme'
import { STORAGE_KEY } from '@/constants/theme'
import Layout from '@/components/Layout'
import { wagmiClient } from '@/connectors'
import { StoreContext, initializeStore } from '@/stores'
import '@/styles/global.css'

dayjs.extend(utc)

// const isServer = typeof window === 'undefined'

const { publicRuntimeConfig } = getConfig()

const manager = createLocalStorageManager(STORAGE_KEY)

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  // 要注意 ssr 的话，值会默认为 false
  const [isPC] = useMediaQuery(`(min-width: ${1080}px)`)

  const stores = useMemo(() => {
    return initializeStore({
      walletStore: true,
    })
  }, [])

  useEffect(() => {
    if (stores.commonStore.isPC !== isPC) {
      stores.commonStore.updateIsPC?.(isPC)
    }
  }, [isPC, stores.commonStore])

  useLinguiInit()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <NextSeo
        title={pageProps?.openGraph?.title || pageProps.title}
        titleTemplate={pageProps?.openGraph?.title ? `%s` : `${publicRuntimeConfig.title} - %s`}
        defaultTitle={publicRuntimeConfig.title}
        description={pageProps?.openGraph?.description || publicRuntimeConfig.description}
        facebook={{
          appId: publicRuntimeConfig.facebookAppId,
        }}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: '',
          title: pageProps.title,
          description: publicRuntimeConfig.description,
          images: [
            {
              url: publicRuntimeConfig.cdn + '/images/apple-icon-144x144.png',
              width: 144,
              height: 144,
              alt: 'logo_144x144',
            },
          ],
          ...pageProps?.openGraph,
        }}
        twitter={{
          handle: '',
          site: '',
          cardType: 'summary',
        }}
      />
      <Head>
        <meta charSet='utf-8' />
        <meta name='App-Config' content='fullscreen=yes,useHistoryState=yes,transition=yes' />
        <meta content='yes' name='apple-mobile-web-app-capable' />
        <meta content='yes' name='apple-touch-fullscreen' />
        <meta content='telephone=no,email=no' name='format-detection' />
        <meta name='keywords' content={publicRuntimeConfig.keywords} />
        <meta
          key='viewport'
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover'
        />
        <link
          rel='shortcut icon'
          href={publicRuntimeConfig.cdn + '/favicon.ico'}
          type='image/x-icon'
        />
        <link
          href={publicRuntimeConfig.cdn + `/images/apple-icon-144x144.png`}
          rel='apple-touch-icon-precomposed'
        />
        {/* grained */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src='/js/grained.min.js' />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${publicRuntimeConfig.gtag}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${publicRuntimeConfig.gtag}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {/* 禁用滚动恢复 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `history.scrollRestoration = "manual"`,
        }}
      />
      <I18nProvider i18n={i18n}>
        <ChakraProvider resetCSS theme={theme} colorModeManager={manager}>
          <StoreContext.Provider value={stores}>
            <WagmiConfig client={wagmiClient}>
              <Layout {...pageProps}>
                <Component {...pageProps} />
              </Layout>
            </WagmiConfig>
            <ToastContainer />
          </StoreContext.Provider>
        </ChakraProvider>
      </I18nProvider>
    </>
  )
}

export default MyApp
