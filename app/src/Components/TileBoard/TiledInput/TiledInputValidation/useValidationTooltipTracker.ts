import { useCallback, useMemo, useState } from 'react'

const initialState: Record<'visible' | 'pending', string | undefined> = {
    visible: undefined,
    pending: undefined,
}

export const useValidationTooltipTracker = () => {
    const [hoverState, setHoverState] = useState(initialState)
    const [focusState, setFocusState] = useState(initialState)

    const handleOnFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setFocusState({
                visible: e.target.name,
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
            setFocusState((prevState) => ({
                visible: undefined,
                pending: prevState.visible,
            }))

            setHoverState({
                visible: e.target.name,
                pending: undefined,
            })
        },
        [],
    )
    const handleOnMouseLeave = useCallback(() => {
        setFocusState((prevState) => ({
            visible: prevState.pending,
            pending: undefined,
        }))

        setHoverState({
            visible: undefined,
            pending: undefined,
        })
    }, [])

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
