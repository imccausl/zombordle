import { useCallback, useMemo } from 'react'

import { useLocalStorage } from '../useLocalStorage'

type Theme = 'dark' | 'light'

export const useTheme = () => {
    const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light')

    const setNewTheme = useCallback(
        (newTheme: Theme) => {
            setTheme(newTheme)
            document.body.setAttribute('data-theme', newTheme)
        },
        [setTheme],
    )

    return useMemo(() => [theme, setNewTheme] as const, [setNewTheme, theme])
}
