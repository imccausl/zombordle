import Head from 'next/head'
import { useCallback } from 'react'

import { type Theme, useThemeContext } from '../Components/Layout/ThemeProvider'

export default function Settings() {
    const { theme, setTheme, colorSchemePreference } = useThemeContext()
    const handleThemeChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setTheme(event.target.value as Theme)
        },
        [setTheme],
    )
    return (
        <>
            <Head>
                <title>Zombordle | Settings</title>
            </Head>
            <p>Settings Page</p>
            <fieldset>
                <legend>Theme</legend>
                <label>
                    <input
                        type="radio"
                        id="dark-mode"
                        name="theme"
                        value="dark"
                        checked={theme === 'dark'}
                        onChange={handleThemeChange}
                    />
                    Dark
                </label>
                <label>
                    <input
                        type="radio"
                        id="light-mode"
                        name="theme"
                        value="light"
                        checked={theme === 'light'}
                        onChange={handleThemeChange}
                    />
                    Light
                </label>
                <label>
                    <input
                        type="radio"
                        id="system-mode"
                        name="theme"
                        value="system"
                        checked={theme === 'system'}
                        onChange={handleThemeChange}
                    />
                    System (Preference: {colorSchemePreference})
                </label>
            </fieldset>
        </>
    )
}
