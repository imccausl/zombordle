import React, { createContext, useContext, useEffect } from 'react'

import { MAX_ATTEMPTS } from '../../App/App.constants'
import { useGameState } from '../GameStateProvider'
import { useSettings } from '../SettingsProvider'

import { useCurrentStats } from './useCurrentStats'

export type Distribution = Record<string, number>

type StatsContextValues = {
    maxStreak: number | undefined
    currentStreak: number | undefined
    distribution: Distribution
    migrateLegacyStats: () => void
}

const StatsContext = createContext<StatsContextValues | null>(null)

export const useStats = () => {
    const context = useContext(StatsContext)

    if (!context) {
        throw new Error('useStats must be used within a StatsProvider')
    }

    return context
}

export const StatsProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const { wordLength } = useSettings()
    const {
        hasWon,
        attempts,
        lastCompleted,
        hasPlayed,
        setHasPlayed,
        setHasCompleted,
        correctWord,
    } = useGameState()
    const {
        setCurrentStats,
        maxStreak,
        currentStreak,
        distribution,
        legacyStats,
        migrateLegacyStats,
    } = useCurrentStats(wordLength)
    useEffect(() => {
        const today = new Date().setHours(0, 0, 0, 0)

        if (hasWon) {
            if (!hasPlayed) {
                const yesterday = new Date(today).setDate(
                    new Date(today).getDate() - 1,
                )
                let newCurrentStreak =
                    lastCompleted === yesterday ? (currentStreak ?? 0) + 1 : 1

                let newMaxStreak =
                    newCurrentStreak >= (maxStreak ?? 0)
                        ? newCurrentStreak
                        : maxStreak ?? 0

                let newDistribution = {
                    ...distribution,
                    [attempts.toString()]:
                        distribution[attempts.toString()] + 1,
                }

                if (wordLength !== 5) {
                    migrateLegacyStats()
                } else {
                    const legacyMaxStreak = legacyStats?.maxStreak
                    const legacyCurrentStreak = legacyStats?.currentStreak
                    const legacyDistribution = legacyStats?.distribution

                    newMaxStreak =
                        typeof legacyMaxStreak === 'number'
                            ? newMaxStreak + legacyMaxStreak
                            : newMaxStreak

                    newCurrentStreak =
                        typeof legacyCurrentStreak === 'number'
                            ? newCurrentStreak + legacyCurrentStreak
                            : newCurrentStreak

                    newDistribution = {
                        ...(legacyDistribution ?? {}),
                        [attempts.toString()]:
                            (legacyDistribution?.[attempts.toString()] ?? 0) +
                            1,
                    }
                }

                setHasCompleted()
                setCurrentStats({
                    status: 'win',
                    attempts,
                    distribution: {
                        ...newDistribution,
                    },
                    currentStreak: newCurrentStreak,
                    maxStreak: newMaxStreak,
                })
            }
        } else if (attempts >= MAX_ATTEMPTS) {
            // loss
            if (!hasPlayed) {
                let lossCount = distribution.loss + 1
                if (wordLength !== 5) {
                    migrateLegacyStats()
                } else {
                    const legacyLossCount = legacyStats?.distribution?.loss
                    lossCount =
                        typeof legacyLossCount === 'number'
                            ? lossCount + legacyLossCount
                            : lossCount
                }

                setHasPlayed()
                setCurrentStats({
                    status: 'loss',
                    attempts,
                    distribution: {
                        ...distribution,
                        loss: lossCount,
                    },
                    currentStreak: 0,
                })

                // temporary
                alert(`The correct word was: ${correctWord}`)
            }
        }
    }, [
        attempts,
        correctWord,
        currentStreak,
        distribution,
        hasPlayed,
        hasWon,
        lastCompleted,
        legacyStats?.currentStreak,
        legacyStats?.distribution,
        legacyStats?.maxStreak,
        maxStreak,
        migrateLegacyStats,
        setCurrentStats,
        setHasCompleted,
        setHasPlayed,
        wordLength,
    ])

    return (
        <StatsContext.Provider
            value={{
                maxStreak,
                currentStreak,
                distribution,
                migrateLegacyStats,
            }}
        >
            {children}
        </StatsContext.Provider>
    )
}
