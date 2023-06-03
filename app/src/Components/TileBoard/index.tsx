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
    onSubmit: (value: string) => void
}

export const MAX_ATTEMPTS = 6

const TileBoard: React.FC<TileBoardProps> = ({
    guesses,
    correctWord,
    onSubmit,
}) => {
    const attemptsRemaining = useMemo(
        () => MAX_ATTEMPTS - guesses.length,
        [guesses],
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
            Array.from({ length: attemptsRemaining - 1 }).map((_, index) => (
                <TileRowContainer role="listitem" key={index}>
                    <TiledBlank correctWordLength={correctWord.length} />
                </TileRowContainer>
            )),
        [correctWord, attemptsRemaining],
    )

    let inputRowContainerPosition: 'middle' | 'top' | 'bottom' = 'middle'
    if (guesses.length === 0) {
        inputRowContainerPosition = 'top'
    } else if (guesses.length === MAX_ATTEMPTS - 1) {
        inputRowContainerPosition = 'bottom'
    }

    return (
        <>
            {Boolean(guesses.length) && (
                <ListContainer role="list">{tiledGuesses}</ListContainer>
            )}
            {Boolean(attemptsRemaining) && (
                <ListContainer
                    as="div"
                    key={`input-form-attempt-${
                        guesses.length - attemptsRemaining
                    }`}
                >
                    <InputRowContainer position={inputRowContainerPosition}>
                        <TiledInput
                            guessNumber={MAX_ATTEMPTS - attemptsRemaining + 1}
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
