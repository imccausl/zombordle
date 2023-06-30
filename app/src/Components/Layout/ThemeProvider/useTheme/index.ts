import { useCallback, useMemo } from 'react'

import { useLocalStorage } from '../../../../hooks/useLocalStorage'

export type Theme = 'dark' | 'light' | 'system'

export const useTheme = () => {
    const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light')

    const setNewTheme = useCallback(
        (newTheme: Theme) => {
            setTheme(newTheme)
        },
        [setTheme],
    )

    return useMemo(() => [theme, setNewTheme] as const, [setNewTheme, theme])
}
