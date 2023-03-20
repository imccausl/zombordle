import { useCallback, useEffect, useMemo, useRef } from 'react'

import { useField } from '../InputValidation/Field'
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
    onChange,
    onKeyDown,
    onFocus,
}) => {
    const onInvalid = useCallback(
        (
            e:
                | React.ChangeEvent<HTMLInputElement>
                | React.FocusEvent<HTMLInputElement>,
        ) => void onValidateError(e, index + 1),
        [index, onValidateError],
    )

    const {
        meta: { setFieldValue },
        field: { onChange: fieldOnChange, ...field },
    } = useField({
        name: `input-${index + 1}`,
        validate: (value) => {
            if (/^[a-z]$/.test(value)) return

            return 'Value must be an alphabetic character (A-Z).'
        },
        required: true,
        onInvalid,
    })
    console.log({ value: field.value })
    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            void onChange(e, index)
            void fieldOnChange(e)
        },
        [fieldOnChange, index, onChange],
    )

    const handleOnKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) =>
            void onKeyDown(e, index, setFieldValue),
        [index, onKeyDown, setFieldValue],
    )

    return (
        <InputTileContainer key={`input-${index + 1}`}>
            <InputTile
                {...field}
                label={`${toOrdinal(index + 1)} letter`}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                onFocus={onFocus}
            />
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
            setFieldValue: (value: string) => void,
        ) => {
            const target = e.target as HTMLInputElement

            target.setSelectionRange(0, target.value.length)
            if (e.key === KEYS.Backspace) {
                e.preventDefault()
                if (!isInputElement(target)) {
                    return
                }
                setFieldValue('')
                const prevElement = getPrevElement(target, index)
                if (isInputElement(prevElement)) {
                    prevElement.focus()
                }
            } else if (e.key === KEYS.ArrowLeft) {
                e.preventDefault()
                e.stopPropagation()
                const prevElement = getPrevElement(target, index)

                if (isInputElement(prevElement)) {
                    prevElement.focus()
                }
            } else if (e.key === KEYS.ArrowRight) {
                e.preventDefault()
                e.stopPropagation()
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
        (values: FormStateType['values']) => {
            const wordSubmission = Object.values(values).reduce(
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
