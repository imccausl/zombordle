import { forwardRef } from 'react'

import { TileStyledTextInput } from './InputTile.styles'

export type InputTileProps = {
    name: string
    label?: string
    value?: string
    valid?: boolean
    required?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const InputTile = forwardRef<HTMLInputElement, InputTileProps>(
    (
        {
            name,
            label,
            valid = true,
            onChange,
            onKeyDown,
            onFocus,
            onBlur,
            value,
            required,
        },
        ref,
    ) => {
        return (
            <TileStyledTextInput
                $valid={valid}
                ref={ref}
                name={name}
                value={value}
                aria-label={label}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                required={required}
            />
        )
    },
)

InputTile.displayName = 'InputTile'

export default InputTile
