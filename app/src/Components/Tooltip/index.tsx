import { useCallback, useEffect, useState } from 'react'

import { type Positions, Revealer } from '../Revealer'

import { DefaultStyle } from './DefaultStyle'

type TooltipProps = React.PropsWithChildren<{
    shouldShow?: boolean
    defaultPosition?: Positions
}>

interface Tooltip extends React.FC<TooltipProps> {
    Content: typeof TooltipContent
}

const Tooltip: Tooltip = ({
    children,
    shouldShow = false,
    defaultPosition,
}) => {
    const [isShowing, setIsShowing] = useState(shouldShow)
    const handleKeyUp = useCallback(
        (event: KeyboardEvent) => {
            if (isShowing && event.key === 'Escape') {
                event.stopPropagation()
                setIsShowing(false)
            }
        },
        [isShowing],
    )

    useEffect(() => {
        addEventListener('keyup', handleKeyUp)

        return () => {
            removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyUp])

    useEffect(() => {
        setIsShowing(shouldShow)
    }, [shouldShow])

    return (
        <Revealer isShowing={isShowing} defaultPosition={defaultPosition}>
            {children}
        </Revealer>
    )
}

type TooltipContentProps = React.PropsWithChildren

const TooltipContent: React.FC<TooltipContentProps> = ({ children }) => {
    return (
        <Revealer.Content>
            <DefaultStyle variant="danger">{children}</DefaultStyle>
        </Revealer.Content>
    )
}

Tooltip.Content = TooltipContent

export { Tooltip }
