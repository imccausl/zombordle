import Head from 'next/head'
import { useMemo } from 'react'
import styled from 'styled-components'

import { statInitialState } from '../Components/App'
import { Statistic } from '../Components/Statistic'
import { useLocalStorage } from '../hooks/useLocalStorage'

const StatContainer = styled.section`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`

export default function Stats() {
    const [stats] = useLocalStorage('zombordle_stats', statInitialState)
    const gamesPlayed = useMemo(
        () =>
            Object.values(stats?.distribution).reduce(
                (count, value) => (count += value),
                0,
            ) ?? 0,
        [stats?.distribution],
    )

    const gamesWon = useMemo(
        () =>
            Object.entries(stats?.distribution).reduce(
                (count, [key, value]) => {
                    if (key !== 'loss') {
                        count += value
                    }

                    return count
                },
                0,
            ) ?? 0,
        [stats?.distribution],
    )
    const winPercent = useMemo(() => {
        const percentage = Math.floor((gamesWon / gamesPlayed) * 100)
        return Number.isNaN(percentage) ? 0 : percentage
    }, [gamesPlayed, gamesWon])

    return (
        <>
            <Head>
                <title>Zombordle | Stats</title>
            </Head>
            <h2>Statistics</h2>
            <StatContainer>
                <Statistic label="Games Played" value={gamesPlayed} />
                <Statistic
                    label="Win Percentage"
                    value={winPercent}
                    asPercent={true}
                />
                <Statistic
                    label="Current Streak"
                    value={stats?.currentStreak ?? 0}
                />
                <Statistic
                    label="Longest Streak"
                    value={stats?.maxStreak ?? 0}
                />
            </StatContainer>
        </>
    )
}
