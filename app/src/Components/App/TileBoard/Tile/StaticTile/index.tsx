import {
    TileContainer,
    type VariantColor,
    VisuallyHidden,
} from './StaticTile.styles'

export type VariantType = keyof typeof VariantColor
export type TileProps = {
    variant?: VariantType
    animationDelayMultiplier?: number
    wordLength?: number
    'aria-label'?: string
}

const StaticTile: React.FC<React.PropsWithChildren<TileProps>> = ({
    children = null,
    variant = 'default',
    animationDelayMultiplier,
    wordLength,
    'aria-label': ariaLabel,
}) => (
    <TileContainer
        wordLength={wordLength}
        animationDelayMultiplier={animationDelayMultiplier}
        role="listitem"
        variant={variant}
        hasLetter={children !== ' '}
    >
        <span aria-hidden="true">{children}</span>
        <VisuallyHidden as="span">{ariaLabel}</VisuallyHidden>
    </TileContainer>
)

export default StaticTile
