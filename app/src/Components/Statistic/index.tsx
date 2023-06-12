import { StatContainer, StatLabel, StatValue } from './Statistic.styles'

export type StatProps = {
    label: string
    value: number
    asPercent?: boolean
}

export const Statistic: React.FC<StatProps> = ({
    label,
    value,
    asPercent = false,
}) => {
    return (
        <StatContainer>
            <StatValue>{`${value}${asPercent ? '%' : ''}`}</StatValue>
            <StatLabel>{label}</StatLabel>
        </StatContainer>
    )
}
