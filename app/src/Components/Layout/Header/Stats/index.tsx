import { StyledLink } from '../Header.styles'

import BarChartIcon from './assets/bar-chart-icon.svg?react'

export const Stats: React.FC = () => {
    return (
        <StyledLink href="/stats" aria-label="Player Statistics">
            <BarChartIcon width="1.5em" height="1.5em" />
        </StyledLink>
    )
}
