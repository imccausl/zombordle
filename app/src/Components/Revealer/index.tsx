import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'

import { Position } from './Revealer.constants'
import { RevealerContainer, RevealerContentContainer } from './Revealer.styles'

type RevealerContextValues = {
    isShowing: boolean
    defaultPosition: Position
    containerRef: React.RefObject<HTMLDivElement>
}
const RevealerContext = createContext<RevealerContextValues | null>(null)

export type RevealerProps = React.PropsWithChildren<
    Partial<Omit<RevealerContextValues, 'containerRef'>>
>
interface Revealer extends React.FC<RevealerProps> {
    Content: typeof RevealerContent
}

export const useRevealerContext = () => {
    const context = useContext(RevealerContext)

    if (!context) {
        throw new Error(
            'Missing Context: use `useTooltipContext` can only be used in a component whose parent is wrapped with <Tooltip />',
        )
    }

    return context
}

export const getContainerPosition = (
    container: HTMLDivElement | null,
    currentPosition: Position,
) => {
    if (!container || typeof window === 'undefined') return currentPosition

    const containerBounds = container?.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    const containerPosRight = containerBounds?.right ?? 0
    const containerPosLeft = containerBounds?.left ?? 0
    const containerPosTop = containerBounds?.top ?? 0
    const containerPosBottom = containerBounds?.bottom ?? 0

    let position = currentPosition
    // rightmost point of the container child
    if (containerPosRight > windowWidth) {
        if (position === Position.bottomLeft) {
            position = Position.bottomCenter
        } else if (position === Position.bottomCenter) {
            position = Position.bottomRight
        } else if (position === Position.bottomRight) {
            position = Position.bottomLeft
        }

        if (position === Position.topLeft) {
            position = Position.topCenter
        } else if (position === Position.topCenter) {
            position = Position.topRight
        } else if (position === Position.topRight) {
            position = Position.topLeft
        }
    }

    if (containerPosLeft < 0) {
        if (position === Position.bottomLeft) {
            position = Position.bottomCenter
        } else if (position === Position.bottomCenter) {
            position = Position.bottomRight

            // this one is a problem: if we're hitting the left side with bottom right then we're in trouble
        } else if (position === Position.bottomRight) {
            position = Position.bottomLeft
        }

        if (position === Position.topLeft) {
            position = Position.topCenter
        } else if (position === Position.topCenter) {
            position = Position.topRight
        } else if (position === Position.topRight) {
            position = Position.topLeft
        }
    }

    if (containerPosTop < 0) {
        if (position === Position.topLeft) {
            position = Position.bottomLeft
        } else if (position === Position.topCenter) {
            position = Position.bottomCenter
        } else if (position === Position.topRight) {
            position = Position.bottomRight
        }
    }

    if (containerPosBottom > windowHeight) {
        if (position === Position.bottomLeft) {
            position = Position.topLeft
        } else if (position === Position.bottomCenter) {
            position = Position.topCenter
        } else if (position === Position.bottomRight) {
            position = Position.topRight
        }
    }

    return position
}

export const useContainerPosition = () => {
    const { isShowing, defaultPosition, containerRef } = useRevealerContext()
    const [position, setPosition] = useState<Position>(defaultPosition)

    const handlePositionChange = useCallback(() => {
        const newPosition = getContainerPosition(
            containerRef?.current,
            position,
        )

        if (newPosition !== position) {
            setPosition(newPosition)
        }
    }, [containerRef, position])

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

const Revealer: Revealer = ({
    children,
    isShowing = false,
    defaultPosition = 'bottom-right',
}) => {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <RevealerContext.Provider
            value={{
                isShowing,
                defaultPosition,
                containerRef,
            }}
        >
            <RevealerContainer>{children}</RevealerContainer>
        </RevealerContext.Provider>
    )
}

export type RevealerContentProps = React.PropsWithChildren<{
    className?: string
}>

export const RevealerContent: React.FC<RevealerContentProps> = ({
    children,
    className,
}) => {
    const { isShowing, containerRef } = useRevealerContext()
    const position = useContainerPosition()

    return (
        <RevealerContentContainer
            $defaultPosition={position}
            className={className}
            ref={containerRef}
        >
            {isShowing ? children : null}
        </RevealerContentContainer>
    )
}

Revealer.Content = RevealerContent

export { Revealer }
export type { Position as Positions }
