import { useMemo } from 'react'

import { type WordListLength, useWordList } from '../useWordList'

const BASE_DATE = new Date(2023, 6, 4, 0, 0, 0, 0)

export const getDateDifference = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)

    const difference = Math.abs(
        BASE_DATE.setHours(0, 0, 0, 0) - new Date(today).setHours(0, 0, 0, 0),
    )

    return Math.floor(difference / 864e5)
}

export const useWord = (wordListLength?: WordListLength) => {
    const { wordList, isValidWord } = useWordList(wordListLength)
    const seed = getDateDifference()
    const index = seed % wordList.length

    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`[DEBUG] Correct word is: ${wordList[index]}`)
        // eslint-disable-next-line no-console
        console.log(
            `[DEBUG] number of ${wordListLength} letter words: ${wordList.length}`,
        )
    }

    return useMemo(
        () => ({ correctWord: wordList[index], wordList, isValidWord }),
        [index, isValidWord, wordList],
    )
}
