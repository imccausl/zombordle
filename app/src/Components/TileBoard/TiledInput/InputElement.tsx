import { useCallback } from 'react'
import { useField } from 'zombordle/packages/formula-one/InputValidation/Field'

import InputTile from '../Tile/InputTile'

import { InputTileContainer } from './TiledInput.styles'
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
    const handleValidation = useCallback((value: string) => {
        if (/^[a-z]$/.test(value)) return

        return 'Value must be an alphabetic character (A-Z).'
    }, [])
    const {
        meta: { error },
        field: { onChange: fieldOnChange, ...field },
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

    return (
        <InputTileContainer key={`input-${index + 1}`}>
            <InputTile
                {...field}
                valid={!error}
                label={`${toOrdinal(index + 1)} letter`}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                onFocus={onFocus}
            />
        </InputTileContainer>
    )
}
