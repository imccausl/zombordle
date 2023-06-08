import { useField } from 'formula-one'
import { useCallback, useMemo } from 'react'

import InputTile from '../Tile/InputTile'

import { InputTileContainer } from './TiledInput.styles'
import { TiledInputValidation } from './TiledInputValidation'
import { type VariantBorder } from './TiledInputValidation/TiledInputValidation.styles'
import { toOrdinal } from './util'

type InputElementProps = {
    index: number
    wordLength: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    onMouseEnter: (e: React.MouseEvent<HTMLInputElement>) => void
    onMouseLeave: (e: React.MouseEvent<HTMLInputElement>) => void
    hasFocus: string | undefined
    isHovering: string | undefined
}
export const InputElement: React.FC<InputElementProps> = ({
    index,
    wordLength,
    onChange,
    onKeyDown,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    hasFocus,
    isHovering,
}) => {
    const handleValidation = useCallback((value: string) => {
        if (/^[a-z]$/i.test(value)) return

        return 'An alphabetic character (A-Z) is required'
    }, [])

    const getPosition = useCallback(() => {
        // this is always center
        if (index + 1 === Math.ceil(wordLength / 2)) {
            return 'bottom-center'
        }

        //leftmost elements
        if (index + 1 < Math.ceil(wordLength / 2)) {
            return 'bottom-right'
        }

        // check if wordLength is even or odd
        if (wordLength % 2 === 0) {
            // even means we have 2 center elements
            // which are wordLength / 2 and( wordLength / 2) - 1
            if (index + 1 === Math.ceil(wordLength / 2) + 1) {
                return 'bottom-center'
            }
        }

        return 'bottom-left'
    }, [index, wordLength])

    const {
        meta: { error },
        field: { onChange: fieldOnChange, onBlur: fieldOnBlur, ...field },
    } = useField({
        name: `input-${index + 1}`,
        validate: handleValidation,
        required: true,
    })

    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            void onChange(e, index)
            void fieldOnChange(e)
        },
        [fieldOnChange, index, onChange],
    )

    const handleOnKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => void onKeyDown(e, index),
        [index, onKeyDown],
    )

    const handleOnBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            fieldOnBlur(e)
            onBlur(e)
        },
        [fieldOnBlur, onBlur],
    )
    const handleOnFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            onFocus(e)
        },
        [onFocus],
    )

    const validationMessageId = `input-${index + 1}-validation-message`
    const validationVariant: VariantBorder = useMemo(() => {
        if (error) {
            return 'invalid'
        } else if (field.value) {
            return 'full'
        }

        return 'default'
    }, [error, field.value])

    return (
        <InputTileContainer key={`input-${index + 1}`}>
            <TiledInputValidation
                id={validationMessageId}
                error={error}
                showValidationMessage={
                    hasFocus === field.name || isHovering === field.name
                }
                defaultPosition={getPosition()}
                variant={validationVariant}
            >
                <InputTile
                    {...field}
                    wordLength={wordLength}
                    aria-describedby={validationMessageId}
                    label={`${toOrdinal(index + 1)} letter`}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            </TiledInputValidation>
        </InputTileContainer>
    )
}
