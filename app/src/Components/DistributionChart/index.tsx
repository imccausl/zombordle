import React, { useMemo } from 'react'

import { type Distribution } from '../App'

import {
    BarLabel,
    DistributionContainer,
    HorizontalBar,
    ItemContainer,
    ItemLabel,
    YAxisContainer,
} from './DistributionChart.styles'

export const DistributionChart: React.FC<{
    distribution: Distribution
    gamesWon: number
}> = ({ distribution, gamesWon }) => {
    const chartElements = useMemo(
        () =>
            Object.entries(distribution)
                .filter(([key]) => key !== 'loss')
                .map(([key, value]) => {
                    return (
                        <ItemContainer key={`${key}-${value}`}>
                            <ItemLabel>{key}</ItemLabel>
                            <HorizontalBar
                                percent={
                                    value === 0
                                        ? 7
                                        : Math.floor((value / gamesWon) * 100)
                                }
                            >
                                <BarLabel>{value}</BarLabel>
                            </HorizontalBar>
                        </ItemContainer>
                    )
                }),
        [distribution, gamesWon],
    )
    return (
        <DistributionContainer>
            <YAxisContainer>{chartElements}</YAxisContainer>
        </DistributionContainer>
    )
}
