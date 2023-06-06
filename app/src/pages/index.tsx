import { Inter } from 'next/font/google'
import Head from 'next/head'

import App from '../Components/App'
import { Header } from '../Components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Zombordle</title>
                <meta
                    name="description"
                    content="An accessible wordle-like thinger"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main
                className={`${inter.className}`}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: '10px',
                    height: '100%',
                    width: '100%',
                }}
            >
                <App />
            </main>
        </>
    )
}
