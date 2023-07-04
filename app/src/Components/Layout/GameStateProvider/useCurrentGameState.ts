import { useCallback, useMemo } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { type WordListLength } from '../../../hooks/words/useWordList'

type GameState = {
    guesses: Array<string>
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
