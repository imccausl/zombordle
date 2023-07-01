import '@zombordle/design-tokens/variables.dark.css'
import '@zombordle/design-tokens/variables.light.css'
import LogRocket from 'logrocket'
import Head from 'next/head'

import { Layout } from '../Components/Layout'
import '../styles/globals.css'

import type { AppProps } from 'next/app'

if (process?.env?.NODE_ENV === 'production') {
    LogRocket.init('mlov0a/zombordle-production')
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="theme-color" content="#FFFFFF" />
                <meta
                    name="description"
                    content="An accessible wordle-like thinger"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <Layout data-theme="dark">
                <Component {...pageProps} />
            </Layout>
        </>
    )
}
