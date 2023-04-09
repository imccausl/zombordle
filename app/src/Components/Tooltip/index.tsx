import { createContext, useContext } from 'react'

import { Pointy } from './Styles/Pointy'
import { TooltipContainer, TooltipContentContainer } from './Tooltip.styles'

type TooltipContextValues = {
    isShowing?: boolean
    defaultPosition?: 'top' | 'bottom' | 'left' | 'right'
}
const TooltipContext = createContext<TooltipContextValues>({})

export type TooltipProps = React.PropsWithChildren<TooltipContextValues>
interface Tooltip extends React.FC<TooltipProps> {
    Content: typeof TooltipContent
}

const Tooltip: Tooltip = ({
    children,
    isShowing = false,
    defaultPosition = 'bottom',
}) => {
    return (
        <TooltipContext.Provider value={{ isShowing, defaultPosition }}>
            <TooltipContainer>{children}</TooltipContainer>
        </TooltipContext.Provider>
    )
}

export type TooltipContentProps = React.PropsWithChildren<{
    className?: string
}>
export const TooltipContent: React.FC<TooltipContentProps> = ({
    children,
    className,
}) => {
    const { isShowing, defaultPosition } = useContext(TooltipContext)

    if (!isShowing) {
        return null
    }

    return (
        <TooltipContentContainer
            $defaultPosition={defaultPosition}
            className={className}
        >
            <Pointy>{children}</Pointy>
        </TooltipContentContainer>
    )
}

Tooltip.Content = TooltipContent

export { Tooltip }
