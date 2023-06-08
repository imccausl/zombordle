import { StyledIconButton } from '../Header.styles'

import { ReactComponent as BarChartIcon } from './assets/bar-chart-icon.svg'

export const Stats: React.FC = () => {
    return (
        <StyledIconButton>
            <BarChartIcon />
        </StyledIconButton>
    )
}
