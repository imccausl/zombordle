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
    wordList: string[]
    onSubmit: (value: string) => void
}

export const MAX_ATTEMPTS = 6

const TileBoard: React.FC<TileBoardProps> = ({
    guesses,
    wordList,
    correctWord,
    hasCorrectGuess,
    onSubmit,
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
                            wordList={wordList}
                            length={correctWord.length}
                            onSubmit={onSubmit}
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
