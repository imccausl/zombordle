import Head from 'next/head'
import { useCallback } from 'react'

import { useThemeContext } from '../Components/Layout/ThemeProvider'
import { type Theme } from '../Components/Layout/ThemeProvider/useTheme'

export default function Settings() {
    const { theme, setNewTheme } = useThemeContext()
    const handleThemeChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewTheme(event.target.value as Theme)
        },
        [setNewTheme],
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
                    System
                </label>
            </fieldset>
        </>
    )
}
