import { useCallback, useMemo } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'

import { type WordListLength } from './words/useWordList'

type GameState = {
    guesses: Array<string>
    hasPlayed: boolean
    lastPlayed: number | null
    lastCompleted: number | null
}
type FullGameState = {
    [key: string]: GameState
}

export const initialGameState: GameState = {
    guesses: [],
    hasPlayed: false,
    lastPlayed: null,
    lastCompleted: null,
}

export const fullInitialGameState: FullGameState = {
    '5': initialGameState,
    '6': initialGameState,
    '7': initialGameState,
}

export const resetInitialGameState: Partial<GameState> = {
    guesses: [],
    hasPlayed: false,
}

export const useCurrentGameState = (wordLength: WordListLength) => {
    const [gameState, setGameState] = useLocalStorage<FullGameState>(
        'zombordle_gameState',
        fullInitialGameState,
    )

    const currentGameState = useMemo(
        () => gameState[wordLength] ?? initialGameState,
        [gameState, wordLength],
    )

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
                guesses: currentGameState.guesses.concat(guess),
            })
        },
        [currentGameState, setCurrentGameState],
    )
    const resetGameState = useCallback(() => {
        setGameState({
            5: {
                ...(gameState[5] ?? initialGameState),
                ...resetInitialGameState,
            },
            6: {
                ...(gameState[6] ?? initialGameState),
                ...resetInitialGameState,
            },
            7: {
                ...(gameState[7] ?? initialGameState),
                ...resetInitialGameState,
            },
        })
    }, [gameState, setGameState])

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
            lastPlayed: new Date().setHours(0, 0, 0, 0),
        })
    }, [setCurrentGameState])

    return useMemo(
        () => ({
            setGuess,
            setHasPlayed,
            resetGameState,
            setHasCompleted,
            currentGameState,
            attempts: currentGameState.guesses.length,
            hasPlayed: currentGameState.hasPlayed,
            guesses: currentGameState.guesses,
            lastCompleted: currentGameState.lastCompleted,
        }),
        [
            currentGameState,
            resetGameState,
            setGuess,
            setHasPlayed,
            setHasCompleted,
        ],
    )
}
