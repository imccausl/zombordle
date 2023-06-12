import { FormProvider, type FormState } from 'formula-one'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useWord } from '../../hooks/words/useWord'
import { type WordListLength } from '../../hooks/words/useWordList'

import { MAX_ATTEMPTS } from './App.constants'
import { AppContainer } from './App.styles'
import { Keyboard } from './Keyboard'
import TileBoard from './TileBoard'

type Stats = {
    attempts: number
    wordLength: WordListLength
    status: 'win' | 'loss' | null
    distribution: Record<string, number>
    currentStreak: number
    maxStreak: number
}

export const statInitialState: Stats = {
    attempts: 0,
    status: null,
    wordLength: 5,
    distribution: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        loss: 0,
    },
    currentStreak: 0,
    maxStreak: 0,
}
const App: React.FC = () => {
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
    const [wordLength] = useLocalStorage<WordListLength>(
        'zombordle_wordLength',
        5,
    )
    const [timeStamps, setTimeStamps] = useLocalStorage<{
        lastPlayed?: number
        lastCompleted?: number
    }>('timestamps', {})

    const [isInvalidWord, setIsInvalidWord] = useState<boolean>(false)
    const { correctWord, wordList } = useWord(
        gameState[0]?.length
            ? (gameState[0]?.length as WordListLength)
            : wordLength,
    )

    useEffect(() => {
        const attempts = gameState.length
        const today = Date.now()

        if (gameState?.includes(correctWord) && attempts <= MAX_ATTEMPTS) {
            if (!hasPlayed) {
                const yesterday = new Date(today).setDate(
                    new Date(today).getDate() - 1,
                )
                const currentStreak =
                    timeStamps.lastCompleted === yesterday
                        ? stats.currentStreak + 1
                        : 1
                const maxStreak =
                    currentStreak > stats.maxStreak
                        ? currentStreak
                        : stats.maxStreak
                setTimeStamps({ lastCompleted: today, lastPlayed: today })

                setHasPlayed(true)
                setStats({
                    ...stats,
                    status: 'win',
                    attempts,
                    wordLength,
                    distribution: {
                        ...stats.distribution,
                        [attempts.toString()]:
                            stats.distribution[attempts.toString()] + 1,
                    },
                    currentStreak: currentStreak,
                    maxStreak: maxStreak,
                })
            }
        } else if (attempts >= MAX_ATTEMPTS) {
            if (!hasPlayed) {
                setHasPlayed(true)
                setStats({
                    ...stats,
                    status: 'loss',
                    wordLength,
                    attempts,
                    distribution: {
                        ...stats.distribution,
                        loss: stats.distribution.loss + 1,
                    },
                    currentStreak: 0,
                })
                setTimeStamps({ lastCompleted: today, ...timeStamps })

                // temporary
                alert(`The correct word was: ${correctWord}`)
            }
        }
    }, [
        correctWord,
        gameState,
        hasPlayed,
        setHasPlayed,
        setStats,
        setTimeStamps,
        stats,
        stats.distribution,
        timeStamps,
        wordLength,
    ])

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
