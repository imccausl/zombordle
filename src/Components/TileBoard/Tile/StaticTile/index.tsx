import { TileContainer, type VariantColor } from './StaticTile.styles'

type ReactProps = {
    children?: string
}

export type TileProps = {
    variant?: keyof typeof VariantColor
}

type Props = ReactProps & TileProps

const StaticTile: React.FC<Props> = ({
    children = null,
    variant = 'default',
}) => {
    return (
        <TileContainer role="listitem" variant={variant}>
            {children}
        </TileContainer>
    )
}

export default StaticTile
