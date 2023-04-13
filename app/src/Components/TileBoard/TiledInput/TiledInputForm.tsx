import { useFormContext } from 'formula-one'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { InputElement } from './InputElement'
import { StyledButton, StyledForm, TileInputGroup } from './TiledInput.styles'

const KEYS = {
    Backspace: 'Backspace',
    Enter: 'Enter',
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
}

const isInputElement = (
    element: ChildNode | null | undefined,
): element is HTMLInputElement => Boolean(element && 'focus' in element)

type TiledInputFormProps = {
    length: number
}
export const TiledInputForm: React.FC<TiledInputFormProps> = ({ length }) => {
    const { getFieldRefs, setFieldValue, isFormValid } = useFormContext()
    const [fieldFocusTracker, setFieldFocusTracker] = useState<{
        isFocused: undefined | string
        pending: undefined | string
    }>({
        isFocused: undefined,
        pending: undefined,
    })
    const [fieldHoverTracker, setFieldHoverTracker] = useState<{
        isHovering: undefined | string
        pending: undefined | string
    }>({
        isHovering: undefined,
        pending: undefined,
    })

    useEffect(() => {
        getFieldRefs()[0]?.current?.focus()
    }, [getFieldRefs])

    const getPrevElement = useCallback(
        (index: number) => {
            const fieldRefs = getFieldRefs()
            return index > 0 && index < fieldRefs.length
                ? fieldRefs[index - 1].current
                : null
        },
        [getFieldRefs],
    )

    const getNextElement = useCallback(
        (index: number) => {
            const fieldRefs = getFieldRefs()
            return index < fieldRefs.length - 1
                ? fieldRefs[index + 1].current
                : null
        },
        [getFieldRefs],
    )

    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
            getNextElement(index)?.focus()
        },
        [getNextElement],
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
            const target = e.target as HTMLInputElement

            target.setSelectionRange(0, target.value.length)
            if (e.key === KEYS.Backspace) {
                e.preventDefault()
                if (!isInputElement(target)) {
                    return
                }
                setFieldValue(target.name, '')
                getPrevElement(index)?.focus()
            } else if (e.key === KEYS.ArrowLeft) {
                getPrevElement(index)?.focus()
            } else if (e.key === KEYS.ArrowRight) {
                getNextElement(index)?.focus()
            } else if (e.key === target.value) {
                // advance the focus even if the onchange
                // isn't fired. Assume if user pressed the same
                // key as is already in the field, that they want
                // to type it and move on to the next field.
                e.preventDefault()
                getNextElement(index)?.focus()
            }
        },
        [getNextElement, getPrevElement, setFieldValue],
    )
    const handleOnFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            const target = e.target
            const currentFieldHover = fieldHoverTracker.isHovering

            if (currentFieldHover) {
                setFieldHoverTracker({
                    pending: currentFieldHover,
                    isHovering: undefined,
                })
            }
            setFieldFocusTracker({
                isFocused: target.name,
                pending: undefined,
            })

            target.setSelectionRange(0, target.value.length)
        },
        [fieldHoverTracker.isHovering],
    )
    const handleOnBlur = useCallback(() => {
        const pendingHoverField = fieldHoverTracker.pending

        if (pendingHoverField) {
            setFieldHoverTracker({
                isHovering: pendingHoverField,
                pending: undefined,
            })
        }

        setFieldFocusTracker({ isFocused: undefined, pending: undefined })
    }, [fieldHoverTracker.pending])

    const handleOnMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLInputElement>) => {
            const fieldHasFocus = fieldFocusTracker.isFocused
            if (fieldHasFocus) {
                setFieldFocusTracker({
                    isFocused: undefined,
                    pending: fieldHasFocus,
                })
            }
            setFieldHoverTracker({
                isHovering: e.target.name,
                pending: undefined,
            })
        },
        [fieldFocusTracker.isFocused],
    )
    const handleOnMouseLeave = useCallback(() => {
        const pendingFieldFocus = fieldFocusTracker.pending
        if (pendingFieldFocus) {
            setFieldFocusTracker({
                isFocused: pendingFieldFocus,
                pending: undefined,
            })
        }

        setFieldHoverTracker({
            isHovering: undefined,
            pending: undefined,
        })
    }, [fieldFocusTracker.pending])
    const tiledInput = useMemo(
        () =>
            new Array(length).fill('').map((_, index: number) => {
                return (
                    <InputElement
                        key={`input-element-${index + 1}`}
                        index={index}
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                        onBlur={handleOnBlur}
                        onKeyDown={handleKeyDown}
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                        hasFocus={fieldFocusTracker.isFocused}
                        isHovering={fieldHoverTracker.isHovering}
                    />
                )
            }),

        [
            length,
            handleOnChange,
            handleOnFocus,
            handleOnBlur,
            handleKeyDown,
            handleOnMouseEnter,
            handleOnMouseLeave,
            fieldFocusTracker.isFocused,
            fieldHoverTracker.isHovering,
        ],
    )

    return (
        <StyledForm>
            <TileInputGroup role="list" $valid={isFormValid}>
                {tiledInput}
            </TileInputGroup>
            <StyledButton type="submit">Submit</StyledButton>
        </StyledForm>
    )
}
