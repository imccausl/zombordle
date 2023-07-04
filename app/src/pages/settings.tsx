import Head from 'next/head'
import { useCallback } from 'react'

import { useSettings } from '../Components/Layout/SettingsProvider'
import { type Theme, useThemeContext } from '../Components/Layout/ThemeProvider'
import { type WordListLength } from '../hooks/words/useWordList'

export default function Settings() {
    const { theme, setTheme, colorSchemePreference } = useThemeContext()
    const { wordLength, setWordLength } = useSettings()

    const handleThemeChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setTheme(event.target.value as Theme)
        },
        [setTheme],
    )
    const handleWordLengthChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const parsedWordLength = parseInt(event.target.value, 10)
            const newWordLength = Number.isNaN(parsedWordLength)
                ? 5
                : parsedWordLength
            setWordLength(newWordLength as WordListLength)
        },
        [setWordLength],
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

            <div>
                <label>
                    Word Length:
                    <input
                        type="range"
                        min="5"
                        max="7"
                        name="word-length"
                        value={wordLength}
                        onChange={handleWordLengthChange}
                    />
                </label>
            </div>
        </>
    )
}
