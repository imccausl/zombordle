import { useMemo } from 'react'

import {
    InputRowContainer,
    ListContainer,
    TileRowContainer,
} from './TileBoard.styles'
import TiledAttempt from './TiledAttempt'
import TiledBlank from './TiledBlank'
import TiledInput from './TiledInput'

export type TileBoardProps = {
    guesses: string[]
    correctWord: string
    hasCorrectGuess: boolean
    isInvalidWord: boolean
    resetInvalidWord: () => void
}

export const MAX_ATTEMPTS = 6

const TileBoard: React.FC<TileBoardProps> = ({
    guesses,
    correctWord,
    hasCorrectGuess,
    isInvalidWord,
    resetInvalidWord,
}) => {
    const attemptsRemaining = useMemo(
        () => MAX_ATTEMPTS - guesses.length,
        [guesses.length],
    )

    const tiledGuesses = useMemo(
        () =>
            guesses.map((guess, index) => (
                <TileRowContainer key={`${guess}-${index + 1}`}>
                    <TiledAttempt word={guess} correctWord={correctWord} />
                </TileRowContainer>
            )),
        [guesses, correctWord],
    )

    const tiledAttemptsRemaining = useMemo(
        () =>
            Array.from({
                length: hasCorrectGuess
                    ? attemptsRemaining
                    : attemptsRemaining - 1,
            }).map((_, index) => (
                <TileRowContainer role="listitem" key={index}>
                    <TiledBlank correctWordLength={correctWord.length} />
                </TileRowContainer>
            )),
        [hasCorrectGuess, attemptsRemaining, correctWord.length],
    )

    return (
        <>
            {Boolean(guesses.length) && (
                <ListContainer role="list">{tiledGuesses}</ListContainer>
            )}
            {Boolean(attemptsRemaining && !hasCorrectGuess) && (
                <ListContainer
                    as="div"
                    key={`input-form-attempt-${
                        guesses.length - attemptsRemaining
                    }`}
                >
                    <InputRowContainer>
                        <TiledInput
                            guessNumber={MAX_ATTEMPTS - attemptsRemaining + 1}
                            length={correctWord.length}
                            isInvalidWord={isInvalidWord}
                            resetInvalidWord={resetInvalidWord}
                        />
                    </InputRowContainer>
                </ListContainer>
            )}
            {Boolean(attemptsRemaining) && (
                <ListContainer role="list">
                    {tiledAttemptsRemaining}
                </ListContainer>
            )}
        </>
    )
}

export default TileBoard
