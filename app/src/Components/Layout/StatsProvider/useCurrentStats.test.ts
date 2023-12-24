import { act, renderHook } from '@testing-library/react'

import { useCurrentStats } from './useCurrentStats'

const mockStatsObject = {
    '5': {
        attempts: 3,
        status: 'win',
        distribution: {
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
            '6': 6,
            loss: 10,
        },
        currentStreak: 2,
        maxStreak: 9,
    },
    '6': {
        attempts: 3,
        status: 'loss',
        distribution: {
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
            '6': 6,
            loss: 10,
        },
        currentStreak: 0,
        maxStreak: 9,
    },
    '7': {
        attempts: 3,
        status: 'win',
        distribution: {
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
            '6': 6,
            loss: 10,
        },
        currentStreak: 1,
        maxStreak: 3,
    },
}

const mockStats = JSON.stringify(mockStatsObject)

describe.each([[5], [6], [7]] as const)('useCurrentStats', (wordLength) => {
    beforeEach(() => {
        window.localStorage.setItem('zombordle_stats', mockStats)
    })

    afterEach(() => {
        window.localStorage.clear()
    })

    it('should return the stats for the current word length', () => {
        const expectedState = mockStatsObject[`${wordLength}`]
        const { result } = renderHook(() => useCurrentStats(wordLength))

        expect(result.current.maxStreak).toEqual(expectedState.maxStreak)
        expect(result.current.distribution).toStrictEqual(
            expectedState.distribution,
        )
        expect(result.current.currentStreak).toEqual(
            expectedState.currentStreak,
        )
    })

    it('should set stats for the current word length', () => {
        const newStats = {
            maxStreak: 10,
            currentStreak: 10,
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
        const { result } = renderHook(() => useCurrentStats(wordLength))

        act(() => {
            result.current.setCurrentStats(newStats)
        })

        expect(result.current.maxStreak).toEqual(10)
        expect(result.current.distribution).toStrictEqual({
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            loss: 0,
        })
        expect(result.current.currentStreak).toEqual(10)
    })
})
