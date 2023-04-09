import { useTooltipContext } from '../..'

import { Container } from './Pointy.style'

import type { Variants } from './Pointy.constants'

type PontyProps = React.PropsWithChildren<{
    variant?: Variants
}>

export const Pointy: React.FC<PontyProps> = ({
    children,
    variant = 'default',
}) => {
    const { defaultPosition } = useTooltipContext()
    return (
        <Container
            $variant={variant}
            $defaultPosition={defaultPosition ?? 'bottom-center'}
        >
            {children}
        </Container>
    )
}
