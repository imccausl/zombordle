import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'

import { RevealerContainer, RevealerContentContainer } from './Revealer.styles'

import type { Positions } from './Revealer.constants'

type RevealerContextValues = {
    isShowing?: boolean
    defaultPosition?: Positions
    containerRef: React.RefObject<HTMLDivElement>
}
const RevealerContext = createContext<RevealerContextValues | null>(null)

export type RevealerProps = React.PropsWithChildren<
    Omit<RevealerContextValues, 'containerRef'>
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

export const useContainerPosition = () => {
    const { isShowing, defaultPosition, containerRef } = useRevealerContext()
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
            console.log({ currentPosition })
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
export type { Positions }
