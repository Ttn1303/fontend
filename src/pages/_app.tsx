import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'

import '@/styles/globals.css'
import 'antd/dist/reset.css'

import type { NextPageWithLayout } from '@/types/next-page'

const theme = {
  token: {
    colorPrimary: '#00b96b'
  }
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <>
      {getLayout(
        <ConfigProvider theme={theme}>
          <Component {...pageProps} />
        </ConfigProvider>
      )}
    </>
  )
}

export default MyApp
