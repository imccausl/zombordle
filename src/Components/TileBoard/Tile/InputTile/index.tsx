import { forwardRef } from 'react'

import { TileStyledTextInput } from './InputTile.styles'

export type InputTileProps = {
    label?: string
    valid?: boolean
}

const InputTile = forwardRef<HTMLInputElement, InputTileProps>(
    ({ label, valid = true, ...inputProps }, ref) => {
        return (
            <TileStyledTextInput
                $valid={valid}
                ref={ref}
                aria-label={label}
                {...inputProps}
            />
        )
    },
)

InputTile.displayName = 'InputTile'

export default InputTile
