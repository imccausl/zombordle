import { useMemo } from 'react'

import { getVariant } from '../TileBoard/util'

import { KeyboardRows } from './Keyboard.constants'
import { KeyboardContainer, RowContainer } from './Keyboard.styles'
import { LetterKey } from './LetterKey'
import { type VariantColor } from './LetterKey/LetterKey.styles'

type KeyboardProps = {
    guesses: string[]
    correctWord: string
}

export const Keyboard: React.FC<KeyboardProps> = ({ guesses, correctWord }) => {
    const correctLetterMap = useMemo(
        () =>
            guesses.reduce<Record<string, VariantColor>>((map, guess) => {
                guess
                    .toLowerCase()
                    .split('')
                    .forEach((letter, index) => {
                        map[letter] = getVariant({ correctWord, letter, index })
                    })

                return map
            }, {}),
        [correctWord, guesses],
    )

    return (
        <KeyboardContainer>
            {KeyboardRows.reduce<JSX.Element[]>((allRows, row) => {
                return allRows.concat(
                    <RowContainer key={row.join('')}>
                        {row.map((letter) => (
                            <LetterKey
                                variant={correctLetterMap[letter]}
                                key={letter}
                                letter={letter}
                            />
                        ))}
                    </RowContainer>,
                )
            }, [])}
        </KeyboardContainer>
    )
}
