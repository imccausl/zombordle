import '@zombordle/design-tokens/variables.dark.css'
import '@zombordle/design-tokens/variables.light.css'
import LogRocket from 'logrocket'

import { Layout } from '../Components/Layout'
import '../styles/globals.css'

import type { AppProps } from 'next/app'

if (process?.env?.NODE_ENV === 'production') {
    LogRocket.init('mlov0a/zombordle-production')
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout data-theme="dark">
            <Component {...pageProps} />
        </Layout>
    )
}
