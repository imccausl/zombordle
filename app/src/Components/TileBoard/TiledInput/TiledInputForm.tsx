import { useFormContext } from 'formula-one'
import { useCallback, useEffect, useMemo } from 'react'

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

            target.setSelectionRange(0, target.value.length)
        },
        [],
    )
    const tiledInput = useMemo(
        () =>
            new Array(length).fill('').map((_, index: number) => {
                return (
                    <InputElement
                        key={`input-element-${index + 1}`}
                        index={index}
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                        onKeyDown={handleKeyDown}
                    />
                )
            }),

        [length, handleOnChange, handleOnFocus, handleKeyDown],
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
