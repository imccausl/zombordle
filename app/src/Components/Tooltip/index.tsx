import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'

import { Pointy } from './Styles/Pointy'
import { TooltipContainer, TooltipContentContainer } from './Tooltip.styles'

import type { Positions } from './Tooltip.constants'

type TooltipContextValues = {
    isShowing?: boolean
    defaultPosition?: Positions
    containerRef: React.RefObject<HTMLDivElement>
}
const TooltipContext = createContext<TooltipContextValues>({})

export type TooltipProps = React.PropsWithChildren<
    Omit<TooltipContextValues, 'containerRef'>
>
interface Tooltip extends React.FC<TooltipProps> {
    Content: typeof TooltipContent
}

export const useTooltipContext = () => {
    const context = useContext(TooltipContext)

    if (!context) {
        throw new Error(
            'Missing Context: use `useTooltipContext` can only be used in a component whose parent is wrapped with <Tooltip />',
        )
    }

    return context
}

export const useContainerPosition = () => {
    const { isShowing, defaultPosition, containerRef } = useTooltipContext()
    const [position, setPosition] = useState(defaultPosition)

    const getContainerPosition = useCallback(
        (
            container: HTMLDivElement | null,
            currentPosition = defaultPosition,
        ) => {
            if (!container || typeof window === 'undefined')
                return defaultPosition

            const containerBounds = container?.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const windowWidth = window.innerWidth

            console.log({ left: containerBounds?.left, windowWidth })
            console.log({ right: containerBounds?.right, windowWidth })

            console.log({ top: containerBounds?.top, windowHeight })
            console.log({ bottom: containerBounds?.bottom, windowHeight })

            const containerPosRight = containerBounds?.right ?? 0
            const containerPosLeft = containerBounds?.left ?? 0

            let position = currentPosition
            // rightmost point of the container child
            if (containerPosRight > windowWidth) {
                console.log('hitting right side', position)
                if (position === 'bottom-left') {
                    position = 'bottom-center'
                } else if (position === 'bottom-center') {
                    position = 'bottom-right'
                } else if (position === 'bottom-right') {
                    position = 'bottom-left'
                }
            }

            if (containerPosLeft < 0) {
                console.log('hitting left side', position)

                if (position === 'bottom-left') {
                    position = 'bottom-center'
                } else if (position === 'bottom-center') {
                    position = 'bottom-right'
                } else if (position === 'bottom-right') {
                    position = 'bottom-left'
                }
            }

            return position
        },
        [defaultPosition],
    )

    const handlePositionChange = useCallback(() => {
        const newPosition = getContainerPosition(
            containerRef?.current,
            position,
        )
        console.log({
            newPosition,
        })
        if (newPosition !== position) {
            setPosition(newPosition)
        }
    }, [containerRef, getContainerPosition, position])

    useEffect(() => {
        if (isShowing) {
            handlePositionChange()
        }
    }, [handlePositionChange, isShowing, position])

    useEffect(() => {
        addEventListener('resize', handlePositionChange)

        return () => {
            removeEventListener('resize', handlePositionChange)
        }
    })

    return position
}

const Tooltip: Tooltip = ({
    children,
    isShowing = false,
    defaultPosition = 'bottom-right',
}) => {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <TooltipContext.Provider
            value={{
                isShowing,
                defaultPosition,
                containerRef,
            }}
        >
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
    const { isShowing, containerRef } = useTooltipContext()
    const position = useContainerPosition()

    return (
        <TooltipContentContainer
            $defaultPosition={position}
            $isVisible={isShowing}
            className={className}
            ref={containerRef}
        >
            {/* temporary pointy style for development purposes. This will be optional */}
            <Pointy variant="danger">{children}</Pointy>
        </TooltipContentContainer>
    )
}

Tooltip.Content = TooltipContent

export { Tooltip }
