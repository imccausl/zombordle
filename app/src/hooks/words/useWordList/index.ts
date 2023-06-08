import { useMemo } from 'react'

import { fiveLetterWords } from '../wordlists/fiveLetterWords'
import { sevenLetterWords } from '../wordlists/sevenLetterWords'
import { sixLetterWords } from '../wordlists/sixLetterWords'

const wordListMap = {
    five: fiveLetterWords,
    six: sixLetterWords,
    seven: sevenLetterWords,
} as const

export const WordList = {
    5: 'five',
    6: 'six',
    7: 'seven',
} as const

export type WordListLength = keyof typeof WordList

export const useWordList = (wordListLength: WordListLength = 5) => {
    return useMemo(() => {
        const inWordList = wordListLength > 4 || wordListLength < 8
        return wordListMap[WordList[!inWordList ? 5 : wordListLength]]
    }, [wordListLength])
}
