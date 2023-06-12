import { StyledLink } from '../Header.styles'

import { ReactComponent as BarChartIcon } from './assets/bar-chart-icon.svg'

export const Stats: React.FC = () => {
    return (
        <StyledLink href="/stats" aria-label="Player Statistics">
            <BarChartIcon />
        </StyledLink>
    )
}
