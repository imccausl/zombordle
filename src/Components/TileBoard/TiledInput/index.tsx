import { useCallback, useMemo, useRef } from 'react'

import { useFormContext } from '../InputValidation/FormContext'
import { FormField } from '../InputValidation/FormField'
import { FormState } from '../InputValidation/FormState'
import InputTile from '../Tile/InputTile'

import {
    InputTileContainer,
    StyledButton,
    StyledForm,
    TileInputGroup,
} from './TiledInput.styles'

export type TiledInputProps = {
    length: number
    value: string
    onSubmit: (value: string) => void
}

const CHARS = {
    Space: ' ',
}

const KEYS = {
    Backspace: 'Backspace',
    Enter: 'Enter',
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
}

const toOrdinal = (num: number) => {
    const number = num.toString()
    const lastTwoDigits = Math.abs(num % 100)
    const isBetween11and13 = lastTwoDigits <= 11 && lastTwoDigits >= 13

    if (isBetween11and13) {
        return `${number}th`
    }
    if (number.endsWith('1')) {
        return `${number}st`
    }
    if (number.endsWith('2')) {
        return `${number}nd`
    }
    if (number.endsWith('3')) {
        return `${number}rd`
    }

    return `${number}th`
}

const isInputElement = (
    element: ChildNode | null | undefined,
): element is HTMLInputElement => Boolean(element && 'focus' in element)

type InputElementProps = {
    index: number
    firstElementRef: React.RefObject<HTMLInputElement>
    onValidateError: (
        e: React.FocusEvent<HTMLInputElement>,
        index: number,
    ) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
    onKeyDown: (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
        setFieldValue: (field: string, value: string) => void,
    ) => void
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
}
const InputElement: React.FC<InputElementProps> = ({
    index,
    onValidateError,
    firstElementRef,
    onChange,
    onKeyDown,
    onFocus,
}) => {
    const { setFieldValue } = useFormContext()

    return (
        <InputTileContainer key={`input-${index + 1}`}>
            <FormField
                validate={(value) => {
                    return /^[a-z]$/.test(value)
                }}
                onError={(e) => void onValidateError(e, index + 1)}
            >
                <InputTile
                    ref={index === 0 ? firstElementRef : null}
                    name={`input-${index + 1}`}
                    label={`${toOrdinal(index + 1)} letter`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        void onChange(e, index)
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                        void onKeyDown(e, index, setFieldValue)
                    }
                    onFocus={onFocus}
                />
            </FormField>
        </InputTileContainer>
    )
}
const TiledInput: React.FC<TiledInputProps> = ({ value, length, onSubmit }) => {
    const firstElementRef = useRef<HTMLInputElement>(null)

    const valueWithCorrectLength = useMemo(
        () => value.concat(CHARS.Space.repeat(length - (value.length || 0))),
        [length, value],
    )

    const getPrevElement = useCallback(
        (currentElement: HTMLInputElement, index: number) =>
            index > 0 && index < valueWithCorrectLength.length
                ? currentElement.parentElement?.parentElement?.children[
                      index - 1
                  ]?.firstChild
                : null,
        [valueWithCorrectLength.length],
    )

    const getNextElement = useCallback(
        (currentElement: HTMLInputElement, index: number) =>
            index < valueWithCorrectLength.length
                ? currentElement.parentElement?.parentElement?.children[
                      index + 1
                  ]?.firstChild
                : null,
        [valueWithCorrectLength.length],
    )

    const handleOnValidateError = useCallback(
        (e: React.FocusEvent<HTMLInputElement>, index: number) => {
            const prevElement = getPrevElement(e.target, index)

            if (isInputElement(prevElement) && e.target.value !== '') {
                prevElement.focus()
            }
        },
        [getPrevElement],
    )
    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
            const nextElement = getNextElement(e.target, index)

            if (isInputElement(nextElement)) {
                nextElement.focus()
            }
        },
        [getNextElement],
    )

    const handleKeyDown = useCallback(
        (
            e: React.KeyboardEvent<HTMLInputElement>,
            index: number,
            setFieldValue: (field: string, value: string) => void,
        ) => {
            const target = e.target as HTMLInputElement

            target.setSelectionRange(0, target.value.length)
            if (e.key === KEYS.Backspace) {
                e.preventDefault()
                if (!isInputElement(target)) {
                    return
                }

                setFieldValue(target.name, '')
                const prevElement = getPrevElement(target, index)
                if (isInputElement(prevElement)) {
                    prevElement.focus()
                }
            } else if (e.key === KEYS.ArrowLeft) {
                const prevElement = getPrevElement(target, index)

                if (isInputElement(prevElement)) {
                    prevElement.focus()
                }
            } else if (e.key === KEYS.ArrowRight) {
                const nextElement = getNextElement(target, index)

                if (isInputElement(nextElement)) {
                    nextElement.focus()
                }
            }
        },
        [getNextElement, getPrevElement, valueWithCorrectLength],
    )
    const handleOnFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            const target = e.target

            target.setSelectionRange(0, target.value.length)
        },
        [],
    )
    const tiledInput = useMemo(() => {
        return valueWithCorrectLength.split('').map((_, index: number) => {
            return (
                <InputElement
                    key={`input-element-${index + 1}`}
                    firstElementRef={firstElementRef}
                    index={index}
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    onValidateError={handleOnValidateError}
                    onKeyDown={handleKeyDown}
                />
            )
        })
    }, [
        valueWithCorrectLength,
        handleOnFocus,
        handleOnValidateError,
        handleOnChange,
        handleKeyDown,
    ])
    const handleOnSubmit = useCallback((props) => {
        console.log(props)
        firstElementRef.current?.focus()
    }, [])

    return (
        <FormState validateOnBlur={true} onSubmit={handleOnSubmit}>
            <StyledForm>
                <TileInputGroup role="list">{tiledInput}</TileInputGroup>
                <StyledButton type="submit">Submit</StyledButton>
            </StyledForm>
        </FormState>
    )
}

export default TiledInput
