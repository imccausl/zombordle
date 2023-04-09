import { createContext, useContext } from 'react'

import { Pointy } from './Styles/Pointy'
import { TooltipContainer, TooltipContentContainer } from './Tooltip.styles'

import type { Positions } from './Tooltip.constants'

type TooltipContextValues = {
    isShowing?: boolean
    defaultPosition?: Positions
}
const TooltipContext = createContext<TooltipContextValues>({})

export type TooltipProps = React.PropsWithChildren<TooltipContextValues>
interface Tooltip extends React.FC<TooltipProps> {
    Content: typeof TooltipContent
}

export const useTooltipContext = () => {
    const context = useContext(TooltipContext)

    if (!context) {
        throw new Error('Must use `useTooltipContext` within a TooltipProvider')
    }

    return context
}

const Tooltip: Tooltip = ({
    children,
    isShowing = false,
    defaultPosition = 'bottom-right',
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
    const { isShowing, defaultPosition } = useTooltipContext()

    if (!isShowing) {
        return null
    }

    return (
        <TooltipContentContainer
            $defaultPosition={defaultPosition}
            className={className}
        >
            {/* temporary pointy style for development purposes. This will be optional */}
            <Pointy variant="danger">{children}</Pointy>
        </TooltipContentContainer>
    )
}

Tooltip.Content = TooltipContent

export { Tooltip }
