import { useField } from 'formula-one'
import { useCallback } from 'react'

import InputTile from '../Tile/InputTile'

import { InputTileContainer } from './TiledInput.styles'
import { TiledInputValidation } from './TiledInputValidation'
import { toOrdinal } from './util'

type InputElementProps = {
    index: number
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

        return 'Please enter an alphabetic character (A-Z).'
    }, [])

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

    return (
        <InputTileContainer key={`input-${index + 1}`}>
            <TiledInputValidation
                error={error}
                showValidationMessage={
                    hasFocus === field.name || isHovering === field.name
                }
            >
                <InputTile
                    {...field}
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
