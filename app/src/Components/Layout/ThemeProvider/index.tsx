import { createContext, useContext, useLayoutEffect, useMemo } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'

export type Theme = 'dark' | 'light' | 'system'

type ContextValues = {
    theme: Theme
    setTheme: (newTheme: Theme) => void
    colorSchemePreference: Omit<Theme, 'system'>
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
    const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system')

    const prefersDarkMQ = useMemo(() => {
        if (typeof window === 'undefined') return

        return window.matchMedia('(prefers-color-scheme: dark)')
    }, [])

    useLayoutEffect(() => {
        if (theme === 'system' && prefersDarkMQ) {
            const handleThemePreferenceChange = (evt: MediaQueryListEvent) =>
                void document.body.setAttribute(
                    'data-theme',
                    evt.matches ? 'dark' : 'light',
                )

            prefersDarkMQ.addEventListener(
                'change',
                handleThemePreferenceChange,
            )
            document.body.setAttribute(
                'data-theme',
                prefersDarkMQ.matches ? 'dark' : 'light',
            )

            return () => {
                prefersDarkMQ.removeEventListener(
                    'change',
                    handleThemePreferenceChange,
                )
            }
        }

        document.body.setAttribute('data-theme', theme)
    }, [prefersDarkMQ, setTheme, theme])

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                colorSchemePreference: prefersDarkMQ?.matches
                    ? 'dark'
                    : 'light',
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}
