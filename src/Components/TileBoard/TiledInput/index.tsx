import { useCallback, useEffect, useMemo, useRef } from 'react'

import { Field } from '../InputValidation/Field'
import { useFormContext } from '../InputValidation/FormContext'
import { FormState } from '../InputValidation/FormState'
import InputTile from '../Tile/InputTile'

import {
    InputTileContainer,
    StyledButton,
    StyledForm,
    TileInputGroup,
} from './TiledInput.styles'
import { toOrdinal } from './util'

import type { FormState as FormStateType } from '../InputValidation/types'

export type TiledInputProps = {
    length: number
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
            <Field
                validate={(value) => {
                    return /^[a-z]$/.test(value)
                }}
                onInvalid={(e) => void onValidateError(e, index + 1)}
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
            </Field>
        </InputTileContainer>
    )
}
const TiledInput: React.FC<TiledInputProps> = ({ length, onSubmit }) => {
    const firstElementRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        firstElementRef.current?.focus()
    }, [])

    const getPrevElement = useCallback(
        (currentElement: HTMLInputElement, index: number) =>
            index > 0 && index < length
                ? currentElement.parentElement?.parentElement?.children[
                      index - 1
                  ]?.firstChild
                : null,
        [length],
    )

    const getNextElement = useCallback(
        (currentElement: HTMLInputElement, index: number) =>
            index < length
                ? currentElement.parentElement?.parentElement?.children[
                      index + 1
                  ]?.firstChild
                : null,
        [length],
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
        [getNextElement, getPrevElement],
    )
    const handleOnFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            const target = e.target

            target.setSelectionRange(0, target.value.length)
        },
        [],
    )
    const tiledInput = useMemo(() => {
        return new Array(length).fill('').map((_, index: number) => {
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
        length,
        handleOnFocus,
        handleOnValidateError,
        handleOnChange,
        handleKeyDown,
    ])
    const handleOnSubmit = useCallback(
        (props: FormStateType) => {
            const wordSubmission = Object.values(props.values).reduce(
                (word, letter) => word.concat(letter),
                '',
            )
            onSubmit(wordSubmission)
        },
        [onSubmit],
    )

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
