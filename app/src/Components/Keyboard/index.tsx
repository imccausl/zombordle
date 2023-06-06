import { useMemo } from 'react'

import { getVariant } from '../TileBoard/util'

import { KeyboardRows } from './Keyboard.constants'
import {
    BackspaceKeyIcon,
    EnterKeyIcon,
    KeyboardContainer,
    RowContainer,
} from './Keyboard.styles'
import { LetterKey } from './LetterKey'
import { type VariantColor } from './LetterKey/LetterKey.styles'

type KeyboardProps = {
    guesses: string[]
    correctWord: string
    hasCorrectGuess: boolean
}

export const Keyboard: React.FC<KeyboardProps> = ({
    guesses,
    correctWord,
    hasCorrectGuess,
}) => {
    const letterVariantMap = useMemo(
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
            {KeyboardRows.reduce<JSX.Element[]>((allRows, row, index) => {
                return allRows.concat(
                    <RowContainer key={row.join('')}>
                        {row.map((letter) => (
                            <LetterKey
                                key={letter}
                                variant={letterVariantMap[letter]}
                            >
                                {letter}
                            </LetterKey>
                        ))}
                        {index === 1 ? (
                            <LetterKey
                                key="enter_key"
                                variant="default"
                                label="Enter"
                                keyCode="Enter"
                                isDisabled={hasCorrectGuess}
                            >
                                <EnterKeyIcon />
                            </LetterKey>
                        ) : null}
                        {index === 2 ? (
                            <LetterKey
                                key="backspace_key"
                                variant="default"
                                label="Backspace"
                                keyCode="Backspace"
                            >
                                <BackspaceKeyIcon />
                            </LetterKey>
                        ) : null}
                    </RowContainer>,
                )
            }, [])}
        </KeyboardContainer>
    )
}
