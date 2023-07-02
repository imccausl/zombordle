import { FormProvider, type FormState } from 'formula-one'
import { useCallback, useMemo, useState } from 'react'

import { type WordListLength } from '../../hooks/words/useWordList'

import { AppContainer } from './App.styles'
import { Keyboard } from './Keyboard'
import TileBoard from './TileBoard'

type AppProps = {
    wordLength: WordListLength
}

const App: React.FC<AppProps> = ({ wordLength }) => {
    const [isInvalidWord, setIsInvalidWord] = useState<boolean>(false)

    const handleOnSubmit = useCallback(
        (values: FormState['values']) => {
            const wordSubmission = Object.values(values)
                .reduce((word, letter) => word.concat(letter), '')
                .toLowerCase()

            if (!isInvalidWord(wordSubmission)) {
                setIsInvalidWord(true)
                // temporary
                alert(`${wordSubmission.toUpperCase()} not in word list`)
                // need to move focus to the first letter
                // and show an error/hint
                return
            }

            setGuess(wordSubmission)
        },
        [gameStart, gameState, setGameStart, setGameState, wordList],
    )
    const resetInvalidWord = useCallback(() => {
        setIsInvalidWord(false)
    }, [])

    return (
        <FormProvider
            /* setting both these values to false validates on submit */
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleOnSubmit}
            initialValues={initialValues}
        >
            <AppContainer>
                <TileBoard
                    guesses={gameState}
                    hasPlayed={hasPlayed}
                    correctWord={correctWord}
                    isInvalidWord={isInvalidWord}
                    resetInvalidWord={resetInvalidWord}
                />
                <Keyboard
                    correctWord={correctWord}
                    guesses={gameState}
                    hasPlayed={hasPlayed}
                />
            </AppContainer>
        </FormProvider>
    )
}

export default App
