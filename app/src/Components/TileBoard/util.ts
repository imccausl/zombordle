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

    return correctWord.toLowerCase().includes(letter)
        ? 'contains-letter'
        : 'no-letter'
}
