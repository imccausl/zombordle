import { TileContainer, type VariantColor } from './StaticTile.styles'

export type TileProps = {
    variant?: keyof typeof VariantColor
    animationDelayMultiplier?: number
    children: string | null
}

const StaticTile: React.FC<TileProps> = ({
    children = null,
    variant = 'default',
    animationDelayMultiplier,
}) => (
    <TileContainer
        animationDelayMultiplier={animationDelayMultiplier}
        role="listitem"
        variant={variant}
    >
        {children}
    </TileContainer>
)

export default StaticTile
