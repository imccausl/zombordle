import React, { createContext, useContext, useEffect } from 'react'

import { MAX_ATTEMPTS } from '../../App/App.constants'
import { GameStateProvider, useGameState } from '../GameStateProvider'
import { useSettings } from '../SettingsProvider'

import { useCurrentStats } from './useCurrentStats'

export type Distribution = Record<string, number>

type StatsContextValues = {
    maxStreak: number | undefined
    currentStreak: number | undefined
    distribution: Distribution
}

const StatsContext = createContext<StatsContextValues | null>(null)

export const useStats = () => {
    const context = useContext(StatsContext)

    if (!context) {
        throw new Error('useStats must be used within a StatsProvider')
    }

    return context
}

const UnwrappedStatsProvider: React.FC<React.PropsWithChildren> = ({
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
    const { setCurrentStats, maxStreak, currentStreak, distribution } =
        useCurrentStats(wordLength)
    useEffect(() => {
        const today = new Date().setHours(0, 0, 0, 0)

        if (hasWon) {
            if (!hasPlayed) {
                const yesterday = new Date(today).setDate(
                    new Date(today).getDate() - 1,
                )
                const newCurrentStreak =
                    lastCompleted === yesterday ? (currentStreak ?? 0) + 1 : 1

                const newMaxStreak =
                    newCurrentStreak >= (maxStreak ?? 0)
                        ? newCurrentStreak
                        : maxStreak

                setHasCompleted()
                setCurrentStats({
                    status: 'win',
                    attempts,
                    distribution: {
                        ...distribution,
                        [attempts.toString()]:
                            distribution[attempts.toString()] + 1,
                    },
                    currentStreak: newCurrentStreak,
                    maxStreak: newMaxStreak,
                })
            }
        } else if (attempts >= MAX_ATTEMPTS) {
            // loss
            if (!hasPlayed) {
                setHasPlayed()
                setCurrentStats({
                    status: 'loss',
                    attempts,
                    distribution: {
                        ...distribution,
                        loss: distribution.loss + 1,
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
        maxStreak,
        setCurrentStats,
        setHasCompleted,
        setHasPlayed,
    ])

    return (
        <StatsContext.Provider
            value={{ maxStreak, currentStreak, distribution }}
        >
            {children}
        </StatsContext.Provider>
    )
}

export const StatsProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    return (
        <GameStateProvider>
            <UnwrappedStatsProvider>{children}</UnwrappedStatsProvider>
        </GameStateProvider>
    )
}
