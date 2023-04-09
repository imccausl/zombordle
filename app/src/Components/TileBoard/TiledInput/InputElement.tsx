import { useField } from 'formula-one'
import { useCallback, useState } from 'react'

import InputTile from '../Tile/InputTile'

import { InputTileContainer } from './TiledInput.styles'
import { TiledInputValidation } from './TiledInputValidation'
import { toOrdinal } from './util'

type InputElementProps = {
    index: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
}
export const InputElement: React.FC<InputElementProps> = ({
    index,
    onChange,
    onKeyDown,
    onFocus,
}) => {
    const [hasFocus, setHasFocus] = useState<boolean>(false)

    const handleValidation = useCallback((value: string) => {
        if (/^[a-z]$/i.test(value)) return

        return 'Please enter an alphabetic character (A-Z).'
    }, [])

    const {
        meta: { error },
        field: { onChange: fieldOnChange, onBlur, ...field },
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
            setHasFocus(false)
            onBlur(e)
        },
        [onBlur],
    )
    const handleOnFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setHasFocus(true)
            onFocus(e)
        },
        [onFocus],
    )

    return (
        <InputTileContainer key={`input-${index + 1}`}>
            <TiledInputValidation
                error={error}
                showValidationMessage={hasFocus}
            >
                <InputTile
                    {...field}
                    label={`${toOrdinal(index + 1)} letter`}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                />
            </TiledInputValidation>
        </InputTileContainer>
    )
}
