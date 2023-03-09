import { forwardRef } from 'react'

import { TileStyledTextInput } from './InputTile.styles'

type InputTileProps = {
    name: string
    label?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
}

const InputTile = forwardRef<HTMLInputElement, InputTileProps>(
    ({ name, label, onChange, onKeyDown, onFocus, value }, ref) => {
        return (
            <TileStyledTextInput
                ref={ref}
                name={name}
                value={value}
                aria-label={label}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
            />
        )
    },
)

InputTile.displayName = 'InputTile'

export default InputTile
