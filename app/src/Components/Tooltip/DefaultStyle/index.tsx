import { useContainerPosition } from '../../Revealer'

import { Container } from './DefaultStyle.style'

import type { Variants } from './DefaultStyle.constants'

type PontyProps = React.PropsWithChildren<{
    variant?: Variants
}>

export const DefaultStyle: React.FC<PontyProps> = ({
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
