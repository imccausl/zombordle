import { FormProvider, type FormState } from 'formula-one'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useWord } from '../../hooks/useWord'
import { useWordList } from '../../hooks/useWordList'
import { Keyboard } from '../Keyboard'
import TileBoard from '../TileBoard'

type Stats = {
    guesses: number
    status: 'win' | 'loss' | null
    distribution: Record<string, number>
}

const statInitialState: Stats = {
    guesses: 0,
    status: null,
    distribution: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        loss: 0,
    },
}
const App: React.FC = () => {
    const correctWord = useWord()
    const wordList = useWordList()

    const [gameState, setGameState] = useLocalStorage<string[]>(
        'zombordle_gameState',
        [],
    )
    const [gameStart, setGameStart] = useLocalStorage<string | null>(
        'zombordle_started',
        null,
    )
    const [stats, setStats] = useLocalStorage<Stats>(
        'zombordle_stats',
        statInitialState,
    )
    const [hasPlayed, setHasPlayed] = useLocalStorage(
        'zombordle_hasPlayed',
        false,
    )

    const [hasCorrectGuess, setHasCorrectGuess] = useState<boolean>(false)
    const [isInvalidWord, setIsInvalidWord] = useState<boolean>(false)

    useEffect(() => {
        if (gameState?.includes(correctWord)) {
            setHasCorrectGuess(true)
            if (!hasPlayed) {
                setHasPlayed(true)
                setStats({
                    status: 'win',
                    guesses: gameState.length,
                    distribution: {
                        ...stats.distribution,
                        [gameState.length.toString()]:
                            stats.distribution[gameState.length.toString()] + 1,
                    },
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correctWord, gameState])

    useEffect(() => {
        const today = new Date().toDateString()
        if (gameStart && today !== gameStart) {
            try {
                setGameState([])
                setGameStart(null)
                setHasPlayed(false)
            } catch {
                // do nothing
            }
        }
    }, [gameStart, gameState, setGameStart, setGameState, setHasPlayed])

    const handleOnSubmit = useCallback(
        (values: FormState['values']) => {
            const wordSubmission = Object.values(values)
                .reduce((word, letter) => word.concat(letter), '')
                .toLowerCase()

            if (
                !wordList.find((word) => word.toLowerCase() === wordSubmission)
            ) {
                setIsInvalidWord(true)
                // temporary
                alert(`${wordSubmission.toUpperCase()} not in word list`)
                // need to move focus to the first letter
                // and show an error/hint
                return
            }

            if (!gameStart) {
                setGameStart(new Date().toDateString())
            }
            setGameState([...gameState, wordSubmission])
        },
        [gameStart, gameState, setGameStart, setGameState, wordList],
    )
    const resetInvalidWord = useCallback(() => {
        setIsInvalidWord(false)
    }, [])

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
                guesses={gameState}
                hasCorrectGuess={hasCorrectGuess}
                correctWord={correctWord}
                isInvalidWord={isInvalidWord}
                resetInvalidWord={resetInvalidWord}
            />
            <Keyboard
                correctWord={correctWord}
                guesses={gameState}
                hasCorrectGuess={hasCorrectGuess}
            />
        </FormProvider>
    )
}

export default App
