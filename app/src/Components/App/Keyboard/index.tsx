import { useMemo } from 'react'

import { VariantToLabel, getVariant } from '../TileBoard/util'

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
    hasPlayed: boolean
}

export const Keyboard: React.FC<KeyboardProps> = ({
    guesses,
    correctWord,
    hasPlayed,
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
        <KeyboardContainer aria-label="Keyboard">
            {KeyboardRows.reduce<JSX.Element[]>((allRows, row, index) => {
                return allRows.concat(
                    <RowContainer key={row.join('')}>
                        {row.map((letter) => {
                            const variant = letterVariantMap[letter]
                            const label = `${letter}${
                                VariantToLabel[variant]
                                    ? ` (${VariantToLabel[variant]})`
                                    : ''
                            }`
                            return (
                                <LetterKey
                                    key={letter}
                                    variant={variant}
                                    label={label}
                                >
                                    {letter}
                                </LetterKey>
                            )
                        })}
                        {index === 1 ? (
                            <LetterKey
                                key="enter_key"
                                variant="default"
                                label="Enter"
                                keyCode="Enter"
                                isDisabled={hasPlayed}
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
