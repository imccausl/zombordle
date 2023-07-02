import { createContext, useContext, useEffect, useMemo } from 'react'

import { useWord } from '../../../hooks/words/useWord'
import { type WordListLength } from '../../../hooks/words/useWordList'
import { MAX_ATTEMPTS } from '../../App/App.constants'

import { useCurrentGameState } from './useCurrentGameState'

type GameStateContextValues = {
    setGuess: (guess: string) => void
    guesses: string[]
    attempts: number
    correctWord: string
    wordList: string[]
    isValidWord: (submission: string) => boolean
    initialGuessValues: Record<string, string>
    hasWon: boolean
}

const GameStateContext = createContext<GameStateContextValues | null>(null)

export const useGameState = () => {
    const context = useContext(GameStateContext)

    if (!context) {
        throw new Error('useGameState must be used within a GameStateProvider')
    }

    return context
}

export const GameStateProvider: React.FC<
    React.PropsWithChildren<{ wordLength: WordListLength }>
> = ({ children, wordLength }) => {
    const {
        gameStarted,
        resetGameState,
        setGameStarted,
        setGuess,
        attempts,
        guesses,
    } = useCurrentGameState(wordLength)
    const { correctWord, wordList, isValidWord } = useWord(wordLength)
    const hasWon = useMemo(() => {
        return guesses?.includes(correctWord) && attempts <= MAX_ATTEMPTS
    }, [attempts, correctWord, guesses])

    useEffect(() => {
        if (!gameStarted) {
            setGameStarted()
        }

        const today = new Date().toDateString()
        if (gameStarted && today !== gameStarted) {
            try {
                resetGameState()
            } catch {
                // do nothing
            }
        }
    }, [gameStarted, resetGameState, setGameStarted])

    const initialGuessValues = useMemo(
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
        <GameStateContext.Provider
            value={{
                setGuess,
                attempts,
                guesses,
                correctWord,
                wordList,
                isValidWord,
                initialGuessValues,
                hasWon,
            }}
        >
            {children}
        </GameStateContext.Provider>
    )
}
