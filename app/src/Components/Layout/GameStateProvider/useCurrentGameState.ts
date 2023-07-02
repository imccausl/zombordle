import { useCallback, useMemo } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { type WordListLength } from '../../../hooks/words/useWordList'

type GameState = {
    guesses: Array<string>
    started: string | null
    hasPlayed: boolean
    lastPlayed: number | null
    lastCompleted: number | null
}
type FullGameState = {
    [key: string]: GameState
}

const initialGameState: GameState = {
    guesses: [],
    hasPlayed: false,
    started: null,
    lastPlayed: null,
    lastCompleted: null,
}

const fullInitialGameState: FullGameState = {
    '5': initialGameState,
}

export const useCurrentGameState = (wordLength: WordListLength) => {
    const [gameState, setGameState] = useLocalStorage<FullGameState>(
        'zombordle_gameState',
        fullInitialGameState,
    )

    const currentGameState = useMemo(() => {
        return gameState[wordLength] ?? initialGameState
    }, [gameState, wordLength])

    const setCurrentGameState = useCallback(
        (state: Partial<FullGameState[string]>) => {
            setGameState({
                ...gameState,
                [wordLength]: { ...currentGameState, ...state },
            })
        },
        [currentGameState, gameState, setGameState, wordLength],
    )

    const setGuess = useCallback(
        (guess: string) => {
            setCurrentGameState({
                ...currentGameState,
                guesses: currentGameState.guesses.concat(guess),
            })
        },
        [currentGameState, setCurrentGameState],
    )
    const setGameStarted = useCallback(() => {
        setCurrentGameState({ started: new Date().toDateString() })
    }, [setCurrentGameState])
    const resetGameState = useCallback(() => {
        setCurrentGameState({ ...initialGameState })
    }, [setCurrentGameState])
    const setHasPlayed = useCallback(() => {
        setCurrentGameState({
            hasPlayed: true,
            lastPlayed: new Date().setHours(0, 0, 0, 0),
        })
    }, [setCurrentGameState])
    const setHasCompleted = useCallback(() => {
        setCurrentGameState({
            hasPlayed: true,
            lastCompleted: new Date().setHours(0, 0, 0, 0),
        })
    }, [setCurrentGameState])

    return useMemo(
        () => ({
            setGuess,
            setGameStarted,
            setHasPlayed,
            resetGameState,
            setHasCompleted,
            currentGameState,
            attempts: currentGameState.guesses.length,
            hasPlayed: currentGameState.hasPlayed,
            guesses: currentGameState.guesses,
            gameStarted: currentGameState.started,
            lastCompleted: currentGameState.lastCompleted,
        }),
        [
            currentGameState,
            resetGameState,
            setGameStarted,
            setGuess,
            setHasPlayed,
            setHasCompleted,
        ],
    )
}
