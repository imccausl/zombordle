import { useMemo } from 'react'

import { dictionary } from '../dictionary'

const DEFAULT_LENGTH = 5

export const WordList = {
    5: 'five',
    6: 'six',
    7: 'seven',
} as const

export type WordListLength = keyof typeof WordList

export const useWordList = (wordListLength: WordListLength = 5) => {
    return useMemo(() => {
        const allowedLength = wordListLength > 4 && wordListLength < 8
        return dictionary.filter((word) => word.length === wordListLength && allowedLength ||DEFAULT_LENGTH )
    }, [wordListLength])
}
