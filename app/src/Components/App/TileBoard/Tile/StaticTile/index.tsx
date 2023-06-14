import { TileContainer, type VariantColor } from './StaticTile.styles'

export type TileProps = {
    variant?: keyof typeof VariantColor
    animationDelayMultiplier?: number
    wordLength?: number
}

const StaticTile: React.FC<React.PropsWithChildren<TileProps>> = ({
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
