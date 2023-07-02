import { createContext, useContext } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { type WordListLength } from '../../../hooks/words/useWordList'

type SettingsContextValues = {
    wordLength: WordListLength
    setWordLength: (length: WordListLength) => void
}

const SettingsContext = createContext<SettingsContextValues | null>(null)

export const useSettings = () => {
    const context = useContext(SettingsContext)

    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider')
    }

    return context
}

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [wordLength, setWordLength] = useLocalStorage<WordListLength>(
        'zombordle_wordLength',
        5,
    )

    return (
        <SettingsContext.Provider value={{ wordLength, setWordLength }}>
            {children}
        </SettingsContext.Provider>
    )
}
