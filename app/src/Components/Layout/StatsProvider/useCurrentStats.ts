import { useCallback, useMemo } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { type WordListLength } from '../../../hooks/words/useWordList'

export type Distribution = Record<string, number>

type Stats = Readonly<{
    attempts: number
    status: 'win' | 'loss' | null
    distribution: Distribution
    currentStreak?: number
    maxStreak?: number
}>

type TotalStats = Readonly<Partial<Record<WordListLength, Stats>>>

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
    const legacyStats = useMemo(() => {
        return { ...((stats as Stats) ?? {}) }
    }, [stats])
    const migrateLegacyStats = useCallback(() => {
        if (!Object.keys(stats).includes('5')) {
            setStats({
                ...stats,
                5: {
                    ...legacyStats,
                },
            })
        }
    }, [legacyStats, setStats, stats])

    return useMemo(
        () => ({
            setCurrentStats,
            maxStreak: currentStats.maxStreak,
            currentStreak: currentStats.currentStreak,
            distribution: currentStats.distribution,
            migrateLegacyStats,
            legacyStats,
        }),
        [
            currentStats.currentStreak,
            currentStats.distribution,
            currentStats.maxStreak,
            setCurrentStats,
            migrateLegacyStats,
            legacyStats,
        ],
    )
}
