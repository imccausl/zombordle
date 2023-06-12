import LogRocket from 'logrocket'

import { Layout } from '../Components/Layout'
import '../styles/globals.css'

import type { AppProps } from 'next/app'

LogRocket.init('mlov0a/zombordle-production')

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
