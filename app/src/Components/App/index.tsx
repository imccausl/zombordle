import { FormProvider, type FormState } from 'formula-one'
import { useCallback, useState } from 'react'

import { GameStateProvider, useGameState } from '../Layout/GameStateProvider'

import { AppContainer } from './App.styles'
import { Keyboard } from './Keyboard'
import TileBoard from './TileBoard'

const GameBoard: React.FC = () => {
    const [isGuessInvalid, setIsGuessInvalid] = useState<boolean>(false)
    const {
        isValidWord,
        setGuess,
        guesses,
        initialGuessValues,
        correctWord,
        hasPlayed,
        gameStarted,
        setGameStarted,
    } = useGameState()

    const handleOnSubmit = useCallback(
        (values: FormState['values']) => {
            if (!gameStarted) {
                setGameStarted()
            }

            const wordSubmission = Object.values(values)
                .reduce((word, letter) => word.concat(letter), '')
                .toLowerCase()

            if (!isValidWord(wordSubmission)) {
                setIsGuessInvalid(true)
                // temporary
                alert(`${wordSubmission.toUpperCase()} not in word list`)
                // need to move focus to the first letter
                // and show an error/hint
                return
            }

            setGuess(wordSubmission)
        },
        [gameStarted, isValidWord, setGameStarted, setGuess],
    )
    const resetInvalidWord = useCallback(() => {
        setIsGuessInvalid(false)
    }, [])

    return (
        <FormProvider
            /* setting both these values to false validates on submit */
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleOnSubmit}
            initialValues={initialGuessValues}
        >
            <AppContainer>
                <TileBoard
                    guesses={guesses}
                    hasPlayed={hasPlayed}
                    correctWord={correctWord}
                    isInvalidWord={isGuessInvalid}
                    resetInvalidWord={resetInvalidWord}
                />
                <Keyboard
                    correctWord={correctWord}
                    guesses={guesses}
                    hasPlayed={hasPlayed}
                />
            </AppContainer>
        </FormProvider>
    )
}

const App: React.FC = () => {
    return (
        <GameStateProvider>
            <GameBoard />
        </GameStateProvider>
    )
}

export default App
