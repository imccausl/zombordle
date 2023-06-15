import { type VariantType } from './Tile/StaticTile'

const BLANK = ' '

export const getVariant = ({
    correctWord,
    letter,
    index,
}: {
    correctWord: string
    letter: string
    index: number
}) => {
    if (letter === BLANK || !letter) {
        return 'default'
    }

    if (correctWord.toLowerCase()[index] === letter) {
        return 'correct-place'
    }

    if (correctWord.toLowerCase().includes(letter)) {
        return 'contains-letter'
    }

    return 'no-letter'
}

export const getVariants = ({
    correctWord,
    word,
}: {
    correctWord: string
    word: string
}) => {
    const correctWordLetterCount = correctWord
        .toLowerCase()
        .split('')
        .reduce<Record<string, number>>((acc, letter) => {
            if (acc[letter]) {
                acc[letter] = acc[letter] + 1
            } else {
                acc[letter] = 1
            }

            return acc
        }, {})

    const variantMap = word
        .toLowerCase()
        .split('')
        .reduce<Record<string, Array<VariantType>>>((acc, letter, index) => {
            if (acc[letter]) {
                if (
                    (acc[letter].includes('correct-place') ||
                        acc[letter].includes('contains-letter')) &&
                    acc[letter].length >= correctWordLetterCount[letter]
                ) {
                    const potentialVariant = getVariant({
                        correctWord,
                        letter,
                        index,
                    })
                    if (potentialVariant === 'correct-place') {
                        acc[letter].push(potentialVariant)
                        const containsLetterIndex =
                            acc[letter].indexOf('contains-letter')
                        if (containsLetterIndex !== -1) {
                            acc[letter][containsLetterIndex] = 'no-letter'
                        }
                    } else {
                        acc[letter].push('no-letter')
                    }
                } else {
                    acc[letter].push(getVariant({ correctWord, letter, index }))
                }
            } else {
                acc[letter] = [getVariant({ correctWord, letter, index })]
            }
            return acc
        }, {})

    return word
        .toLowerCase()
        .split('')
        .map((letter) => {
            return variantMap[letter].shift() ?? 'default'
        })
}

export const VariantToLabel = {
    'correct-place': 'correct',
    'contains-letter': 'present',
    'no-letter': 'incorrect',
    default: '',
    full: '',
}
