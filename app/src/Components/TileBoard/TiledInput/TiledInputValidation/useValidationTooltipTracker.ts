import { useFormContext } from 'formula-one'
import { useCallback, useEffect, useMemo, useState } from 'react'

const initialState: Record<'visible' | 'pending', string | undefined> = {
    visible: undefined,
    pending: undefined,
}

export const useValidationTooltipTracker = () => {
    const [hoverState, setHoverState] = useState(initialState)
    const [focusState, setFocusState] = useState(initialState)
    const { errors } = useFormContext()

    const handleEscapeKeyPressed = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setFocusState(initialState)
            setHoverState(initialState)
        }
    }, [])

    useEffect(() => {
        addEventListener('keyup', handleEscapeKeyPressed)

        return () => {
            removeEventListener('keyup', handleEscapeKeyPressed)
        }
    })

    const handleOnFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setFocusState({
                visible: e.currentTarget.name,
                pending: undefined,
            })

            setHoverState((prevState) => ({
                visible: undefined,
                pending: prevState.visible,
            }))
        },
        [],
    )
    const handleOnBlur = useCallback(() => {
        setHoverState((prevState) => ({
            visible: prevState.pending,
            pending: undefined,
        }))

        setFocusState({ visible: undefined, pending: undefined })
    }, [])

    const handleOnMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLInputElement>) => {
            const hasError = errors[e.currentTarget.name]

            if (hasError) {
                setFocusState((prevState) => ({
                    visible: undefined,
                    pending: prevState.visible,
                }))

                setHoverState({
                    visible: e.currentTarget.name,
                    pending: undefined,
                })
            }
        },
        [errors],
    )
    const handleOnMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLInputElement>) => {
            const hasError = errors[e.currentTarget.name]

            if (hasError) {
                setFocusState((prevState) => ({
                    visible: prevState.pending,
                    pending: undefined,
                }))

                setHoverState({
                    visible: undefined,
                    pending: undefined,
                })
            }
        },
        [errors],
    )

    return useMemo(
        () => ({
            onFocus: handleOnFocus,
            onBlur: handleOnBlur,
            onMouseEnter: handleOnMouseEnter,
            onMouseLeave: handleOnMouseLeave,
            hoverState,
            focusState,
        }),
        [
            focusState,
            handleOnBlur,
            handleOnFocus,
            handleOnMouseEnter,
            handleOnMouseLeave,
            hoverState,
        ],
    )
}
