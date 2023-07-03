import { ThemeTokens } from '@zombordle/design-tokens'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { DistributionChart } from '../Components/DistributionChart'
import { useSettings } from '../Components/Layout/SettingsProvider'
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

const StyledLink = styled(Link)`
    color: ${ThemeTokens.fontLink};
    text-decoration: underline;
`

export default function Stats() {
    const { distribution, currentStreak, maxStreak, migrateLegacyStats } =
        useStats()
    const { wordLength } = useSettings()

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

    useEffect(() => {
        migrateLegacyStats()
    }, [migrateLegacyStats])

    return (
        <>
            <Head>
                <title>Zombordle | Stats</title>
            </Head>
            <h2>Statistics for {wordLength} Letter Games</h2>
            <p>
                You can change the word length on the{' '}
                <StyledLink href="/settings">Settings</StyledLink> page
            </p>
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
