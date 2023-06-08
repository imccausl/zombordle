import { TileContainer, type VariantColor } from './StaticTile.styles'

export type TileProps = {
    variant?: keyof typeof VariantColor
    animationDelayMultiplier?: number
    children: string | null
    wordLength?: number
}

const StaticTile: React.FC<TileProps> = ({
    children = null,
    variant = 'default',
    animationDelayMultiplier,
    wordLength,
}) => (
    <TileContainer
        wordLength={wordLength}
        animationDelayMultiplier={animationDelayMultiplier}
        role="listitem"
        variant={variant}
    >
        {children}
    </TileContainer>
)

export default StaticTile
