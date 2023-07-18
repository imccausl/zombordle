import { useMemo } from 'react'
import seedrandom from 'seedrandom'

import dictionary from '../dictionary.json'

const DEFAULT_LENGTH = 5
const RANDOM_SEED =
    'kdjjhsfu387248932iucajchas.j,dnf.eadnzzombocomyoucandoanything7384738'

export const WordList = {
    5: 'five',
    6: 'six',
    7: 'seven',
} as const

const randomize = seedrandom(RANDOM_SEED)
function shuffle<T>(array: T[]) {
    let currentLength = array.length

    while (currentLength) {
        const index = Math.floor(randomize() * currentLength--)
        const swap = array[currentLength]
        array[currentLength] = array[index]
        array[index] = swap
    }

    return array
}
const shuffledDictionary = shuffle(dictionary as Array<string>)

export type WordListLength = keyof typeof WordList

export const useWordList = (wordListLength: WordListLength = 5) => {
    return useMemo(() => {
        const allowedLength = wordListLength > 4 && wordListLength < 8
        return shuffledDictionary.filter(
            (word) =>
                word.length ===
                (allowedLength ? wordListLength : DEFAULT_LENGTH),
        )
    }, [wordListLength])
}
