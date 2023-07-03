import Head from 'next/head'
import { useMemo } from 'react'
import styled from 'styled-components'

import { DistributionChart } from '../Components/DistributionChart'
import { useStats } from '../Components/Layout/StatsProvider'
import { Statistic } from '../Components/Statistic'

const StatContainer = styled.section`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
`

export default function Stats() {
    const { distribution, currentStreak, maxStreak } = useStats()
    const gamesPlayed = useMemo(
        () =>
            Object.values(distribution).reduce(
                (count, value) => (count += value),
                0,
            ) ?? 0,
        [distribution],
    )

    const gamesWon = useMemo(
        () =>
            Object.entries(distribution).reduce((count, [key, value]) => {
                if (key !== 'loss') {
                    count += value
                }

                return count
            }, 0) ?? 0,
        [distribution],
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
                <Statistic label="Current Streak" value={currentStreak ?? 0} />
                <Statistic label="Longest Streak" value={maxStreak ?? 0} />
            </StatContainer>
            <DistributionChart
                distribution={distribution}
                gamesWon={gamesWon}
            />
        </>
    )
}
