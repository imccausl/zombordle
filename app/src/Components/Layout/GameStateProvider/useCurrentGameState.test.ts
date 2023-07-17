import { act, renderHook } from '@testing-library/react'

import {
    initialGameState,
    resetInitialGameState,
    useCurrentGameState,
} from './useCurrentGameState'

describe('useCurrentGameState', () => {
    beforeEach(() => {
        const mockState = JSON.stringify({
            '5': {
                guesses: ['trial', 'error', '5test'],
                hasPlayed: true,
                lastPlayed: 1688184000000,
                lastCompleted: 1688184000000,
            },
            '6': {
                guesses: ['season', 'peptic', '6ltest'],
                hasPlayed: false,
                lastPlayed: 1688184000000,
                lastCompleted: 1688184000000,
            },
            '7': {
                guesses: ['ductile', 'aground', '7letest'],
                hasPlayed: true,
                lastPlayed: 1688184000000,
                lastCompleted: 1688184000000,
            },
        })
        window.localStorage.setItem('zombordle_gameState', mockState)
    })

    afterEach(() => {
        window.localStorage.clear()
    })

    it.each`
        wordLength | expectedState
        ${5}       | ${{ ...initialGameState, guesses: ['trial', 'error', '5test'], hasPlayed: true, lastPlayed: 1688184000000, lastCompleted: 1688184000000 }}
        ${6}       | ${{ ...initialGameState, guesses: ['season', 'peptic', '6ltest'], lastPlayed: 1688184000000, lastCompleted: 1688184000000 }}
        ${7}       | ${{ ...initialGameState, guesses: ['ductile', 'aground', '7letest'], hasPlayed: true, lastPlayed: 1688184000000, lastCompleted: 1688184000000 }}
    `(
        'should return the game state for the current game ($wordLength letters)',
        ({ wordLength, expectedState }) => {
            const { result } = renderHook(() => useCurrentGameState(wordLength))
            expect(result.current.currentGameState).toEqual(expectedState)
        },
    )

    it('should return the initial game state if no game state is found', () => {
        window.localStorage.clear()
        const { result } = renderHook(() => useCurrentGameState(8 as any))
        expect(result.current.currentGameState).toEqual(initialGameState)
    })

    it('should set guesses for the current game', () => {
        const { result } = renderHook(() => useCurrentGameState(5))
        act(() => void result.current.setGuess('chomp'))
        expect(result.current.guesses).toEqual([
            'trial',
            'error',
            '5test',
            'chomp',
        ])
    })

    it('should set hasPlayed and lastPlayed values for the current game', () => {
        vi.setSystemTime(new Date(2023, 6, 1))
        const { result } = renderHook(() => useCurrentGameState(5))
        expect(result.current.currentGameState.hasPlayed).toEqual(true)
        expect(result.current.currentGameState.lastPlayed).toBe(1688184000000)
        act(() => void result.current.setHasPlayed())
        expect(result.current.hasPlayed).toEqual(true)
        expect(result.current.currentGameState.lastPlayed).toBe(1688184000000)
    })

    it('should reset the current game state, keeping the lastCompleted and lastPlayed values', () => {
        const { result } = renderHook(() => useCurrentGameState(5))
        expect(result.current.currentGameState).toEqual({
            ...initialGameState,
            guesses: ['trial', 'error', '5test'],
            hasPlayed: true,
            lastCompleted: 1688184000000,
            lastPlayed: 1688184000000,
        })
        act(() => void result.current.resetGameState())
        expect(result.current.currentGameState).toEqual({
            lastCompleted: 1688184000000,
            lastPlayed: 1688184000000,
            ...resetInitialGameState,
        })
    })

    it('should set hasPlayed, lastCompleted, and lastPlayed values for the current game', () => {
        vi.setSystemTime(new Date(2023, 6, 1))
        const { result } = renderHook(() => useCurrentGameState(5))
        expect(result.current.currentGameState.hasPlayed).toEqual(true)
        expect(result.current.currentGameState.lastPlayed).toEqual(
            1688184000000,
        )
        act(() => void result.current.setHasCompleted())
        expect(result.current.hasPlayed).toEqual(true)
        expect(result.current.lastCompleted).toBe(1688184000000)
    })

    it('should return the current number of attempts for the current game', () => {
        const { result } = renderHook(() => useCurrentGameState(5))
        expect(result.current.attempts).toEqual(3)
    })

    it('should return the hasPlayed value for the current game', () => {
        const { result } = renderHook(() => useCurrentGameState(5))
        expect(result.current.hasPlayed).toEqual(true)
    })

    it('should return the state of the guesses for the current game', () => {
        const { result } = renderHook(() => useCurrentGameState(5))
        expect(result.current.guesses).toEqual(['trial', 'error', '5test'])
    })

    it('should return the lastCompleted value for the current game', () => {
        const { result } = renderHook(() => useCurrentGameState(5))
        expect(result.current.lastCompleted).toBe(1688184000000)
    })
})
