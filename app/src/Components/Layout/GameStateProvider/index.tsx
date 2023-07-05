import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { useWord } from '../../../hooks/words/useWord'
import { MAX_ATTEMPTS } from '../../App/App.constants'
import { useSettings } from '../SettingsProvider'

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
    lastCompleted: number | null
    hasPlayed: boolean
    setHasPlayed: () => void
    setHasCompleted: () => void
    gameStarted: string | null
    setGameStarted: () => void
}

const GAME_STATE_SINGLETON_KEY = Symbol.for('zombordle.game.state.context')
type GlobalEnhancedGameStateSingleton = typeof globalThis & {
    [GAME_STATE_SINGLETON_KEY]: React.Context<GameStateContextValues | null>
}

const GameStateContext = ((globalThis as GlobalEnhancedGameStateSingleton)[
    GAME_STATE_SINGLETON_KEY
] ??= createContext<GameStateContextValues | null>(null))

export const useGameState = () => {
    const context = useContext(GameStateContext)

    if (!context) {
        throw new Error('useGameState must be used within a GameStateProvider')
    }

    return context
}

export const GameStateProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const { wordLength } = useSettings()
    const {
        resetGameState,
        setGuess,
        attempts,
        guesses,
        lastCompleted,
        hasPlayed,
        setHasPlayed,
        setHasCompleted,
    } = useCurrentGameState(wordLength)
    const { correctWord, wordList, isValidWord } = useWord(wordLength)
    const [gameStarted, setGameStarted] = useLocalStorage<string | null>(
        'zombordle_started',
        null,
    )

    const hasWon = useMemo(() => {
        return guesses?.includes(correctWord) && attempts <= MAX_ATTEMPTS
    }, [attempts, correctWord, guesses])
    const setNewGameStarted = useCallback(() => {
        setGameStarted(new Date().toDateString())
    }, [setGameStarted])

    useEffect(() => {
        const today = new Date().toDateString()

        if (gameStarted && today !== gameStarted) {
            try {
                resetGameState()
                setGameStarted(today)
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
                lastCompleted,
                hasPlayed,
                setHasPlayed,
                setHasCompleted,
                gameStarted,
                setGameStarted: setNewGameStarted,
            }}
        >
            {children}
        </GameStateContext.Provider>
    )
}
