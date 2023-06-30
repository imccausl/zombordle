import Head from 'next/head'
import { useCallback } from 'react'

import { useTheme } from '../hooks/useTheme'

export default function Settings() {
    const [_, setNewTheme] = useTheme()
    const toggleTheme = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                setNewTheme('dark')
            } else {
                setNewTheme('light')
            }
        },
        [setNewTheme],
    )
    return (
        <>
            <Head>
                <title>Zombordle | Settings</title>
            </Head>
            <p>Settings Page</p>
            <label>
                <input
                    type="checkbox"
                    name="dark_mode"
                    onChange={toggleTheme}
                />
                Dark Mode
            </label>
        </>
    )
}
