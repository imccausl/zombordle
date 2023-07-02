import { createContext, useContext, useEffect } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { useWord } from '../../../hooks/words/useWord'
import { type WordListLength } from '../../../hooks/words/useWordList'
import { MAX_ATTEMPTS } from '../../App/App.constants'

type StatsContextValues = {
    wordLength: WordListLength
    setWordLength: (length: WordListLength) => void
}

export type Distribution = Record<string, number>

type Stats = {
    attempts: number
    wordLength: WordListLength
    status: 'win' | 'loss' | null
    distribution: Distribution
    currentStreak?: number
    maxStreak?: number
}

export const statInitialState: Stats = {
    attempts: 0,
    status: null,
    wordLength: 5,
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
    const [stats, setStats] = useLocalStorage<Stats>(
        'zombordle_stats',
        statInitialState,
    )

    const [timeStamps, setTimeStamps] = useLocalStorage<{
        lastPlayed?: number
        lastCompleted?: number
    }>('timestamps', {})

    const { correctWord } = useWord(wordLength)

    useEffect(() => {
        const attempts = gameState.length
        const today = new Date().setHours(0, 0, 0, 0)

        if (gameState?.includes(correctWord) && attempts <= MAX_ATTEMPTS) {
            // win
            if (!hasPlayed) {
                const yesterday = new Date(today).setDate(
                    new Date(today).getDate() - 1,
                )
                const currentStreak =
                    timeStamps.lastCompleted === yesterday
                        ? (stats.currentStreak ?? 0) + 1
                        : 1

                const maxStreak =
                    currentStreak >= (stats.maxStreak ?? 0)
                        ? currentStreak
                        : stats.maxStreak

                setTimeStamps({ lastCompleted: today, lastPlayed: today })
                setHasPlayed(true)
                setStats({
                    ...stats,
                    status: 'win',
                    attempts,
                    wordLength,
                    distribution: {
                        ...stats.distribution,
                        [attempts.toString()]:
                            stats.distribution[attempts.toString()] + 1,
                    },
                    currentStreak: currentStreak,
                    maxStreak: maxStreak,
                })
            }
        } else if (attempts >= MAX_ATTEMPTS) {
            // loss
            if (!hasPlayed) {
                setHasPlayed(true)
                setStats({
                    ...stats,
                    status: 'loss',
                    wordLength,
                    attempts,
                    distribution: {
                        ...stats.distribution,
                        loss: stats.distribution.loss + 1,
                    },
                    currentStreak: 0,
                })
                setTimeStamps({ lastPlayed: today, ...timeStamps })

                // temporary
                alert(`The correct word was: ${correctWord}`)
            }
        }
    }, [
        correctWord,
        gameState,
        hasPlayed,
        setHasPlayed,
        setStats,
        setTimeStamps,
        stats,
        stats.distribution,
        timeStamps,
        wordLength,
    ])

    return (
        <StatsContext.Provider value={{ wordLength, setWordLength }}>
            {children}
        </StatsContext.Provider>
    )
}
