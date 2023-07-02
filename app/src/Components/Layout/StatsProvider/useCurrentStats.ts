import { useCallback, useMemo } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { type WordListLength } from '../../../hooks/words/useWordList'

export type Distribution = Record<string, number>

type Stats = {
    attempts: number
    status: 'win' | 'loss' | null
    distribution: Distribution
    currentStreak?: number
    maxStreak?: number
}

type TotalStats = {
    [key: string]: Stats
}

const statInitialState: Stats = {
    attempts: 0,
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
    currentStreak: 0,
    maxStreak: 0,
}

export const totalStatInitialState: TotalStats = {
    '5': statInitialState,
}

export const useCurrentStats = (wordLength: WordListLength) => {
    const [stats, setStats] = useLocalStorage<TotalStats>(
        'zombordle_stats',
        totalStatInitialState,
    )

    const currentStats = useMemo(
        () => stats[wordLength] ?? statInitialState,
        [stats, wordLength],
    )
    const setCurrentStats = useCallback(
        (newStats: Partial<Stats>) => {
            setStats({
                ...stats,
                [wordLength]: {
                    ...currentStats,
                    ...newStats,
                },
            })
        },
        [currentStats, setStats, stats, wordLength],
    )

    return useMemo(
        () => ({
            setCurrentStats,
            maxStreak: currentStats.maxStreak,
            currentStreak: currentStats.currentStreak,
            distribution: currentStats.distribution,
        }),
        [
            currentStats.currentStreak,
            currentStats.distribution,
            currentStats.maxStreak,
            setCurrentStats,
        ],
    )
}
