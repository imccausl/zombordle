import { useContainerPosition } from '../..'

import { Container } from './Pointy.style'

import type { Variants } from './Pointy.constants'

type PontyProps = React.PropsWithChildren<{
    variant?: Variants
}>

export const Pointy: React.FC<PontyProps> = ({
    children,
    variant = 'default',
}) => {
    const position = useContainerPosition()

    return (
        <Container
            $variant={variant}
            $defaultPosition={position ?? 'bottom-left'}
        >
            {children}
        </Container>
    )
}
