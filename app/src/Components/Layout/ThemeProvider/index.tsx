import { createContext, useContext, useLayoutEffect } from 'react'

import { type Theme, useTheme } from './useTheme'

type ContextValues = {
    theme: Theme
    setNewTheme: (newTheme: Theme) => void
}

const ThemeContext = createContext<ContextValues | null>(null)

export const useThemeContext = () => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider')
    }

    return context
}

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [theme, setNewTheme] = useTheme()

    useLayoutEffect(() => {
        if (theme === 'system') {
            const mq = window.matchMedia('(prefers-color-scheme: dark)')
            const handleThemePreferenceChange = (evt: MediaQueryListEvent) =>
                void document.body.setAttribute(
                    'data-theme',
                    evt.matches ? 'dark' : 'light',
                )

            mq.addEventListener('change', handleThemePreferenceChange)
            document.body.setAttribute(
                'data-theme',
                mq.matches ? 'dark' : 'light',
            )

            return () => {
                mq.removeEventListener('change', handleThemePreferenceChange)
            }
        }

        document.body.setAttribute('data-theme', theme)
    }, [setNewTheme, theme])

    return (
        <ThemeContext.Provider value={{ theme, setNewTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
