import DefaultLayout from '@/layouts/DefaultLayout'
import { Flex } from '@chakra-ui/react'
import { Provider as ChakraProvider } from '@/components/ui/provider'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

// GLOBAL STYLES
import '@/styles/globals.css'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  // defaultSeoData: GlobalSeo
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Render the page custom layout, or the Default Layout if no custom layout exists
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <ChakraProvider>
      <Flex id="app-content" direction="column" flexGrow="1">
        {getLayout(<Component {...pageProps} />)}
      </Flex>
    </ChakraProvider>
  )
}
