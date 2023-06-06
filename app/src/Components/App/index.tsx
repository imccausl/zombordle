import { FormProvider, type FormState } from 'formula-one'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useWord } from '../../hooks/useWord'
import { useWordList } from '../../hooks/useWordList'
import { Keyboard } from '../Keyboard'
import TileBoard from '../TileBoard'

const App: React.FC = () => {
    const correctWord = useWord()
    const wordList = useWordList()

    const [guesses, setGuesses] = useLocalStorage<string[]>(
        'zombordle_guesses',
        [],
    )
    const [gameStart, setGameStart] = useLocalStorage<string | null>(
        'zombordle_started',
        null,
    )

    const [hasCorrectGuess, setHasCorrectGuess] = useState<boolean>(false)

    useEffect(() => {
        if (guesses?.includes(correctWord)) {
            setHasCorrectGuess(true)
        }
    }, [correctWord, guesses])

    useEffect(() => {
        const today = new Date().toDateString()
        if (gameStart && today !== gameStart) {
            try {
                setGuesses([])
                setGameStart(null)
            } catch {
                // do nothing
            }
        }
    }, [gameStart, guesses, setGameStart, setGuesses])

    const handleOnSubmit = useCallback(
        (values: FormState['values']) => {
            const wordSubmission = Object.values(values).reduce(
                (word, letter) => word.concat(letter),
                '',
            )

            if (
                !wordList.find(
                    (word) =>
                        word.toLowerCase() === wordSubmission.toLowerCase(),
                )
            ) {
                // temporary
                alert(`${wordSubmission} not in word list`)
                // need to move focus to the first letter
                // and show an error/hint
                return
            }

            if (!gameStart) {
                setGameStart(new Date().toDateString())
            }
            setGuesses([...guesses, wordSubmission])
        },
        [gameStart, guesses, setGameStart, setGuesses, wordList],
    )

    const initialValues = useMemo(
        () =>
            new Array(correctWord.length)
                .fill('')
                .reduce((acc, _, index: number) => {
                    acc[`input-${index + 1}`] = ''
                    return acc
                }, {}),
        [correctWord.length],
    )

    return (
        <FormProvider
            validateOnBlur={true}
            onSubmit={handleOnSubmit}
            initialValues={initialValues}
        >
            <TileBoard
                guesses={guesses}
                hasCorrectGuess={hasCorrectGuess}
                correctWord={correctWord}
            />
            <Keyboard correctWord={correctWord} guesses={guesses} />
        </FormProvider>
    )
}

export default App
