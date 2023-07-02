import Head from 'next/head'

import App from '../Components/App'
import { useSettings } from '../Components/Layout/SettingsProvider'

export default function Home() {
    const { wordLength } = useSettings()

    return (
        <>
            <Head>
                <title>Zombordle</title>
            </Head>
            <App wordLength={wordLength} />
        </>
    )
}
