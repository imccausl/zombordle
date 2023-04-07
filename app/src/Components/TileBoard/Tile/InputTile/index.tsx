import { forwardRef } from 'react'

import { TileStyledTextInput } from './InputTile.styles'

export type InputTileProps = React.ComponentPropsWithoutRef<'input'> & {
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
                maxLength={1}
                type="text"
            />
        )
    },
)

InputTile.displayName = 'InputTile'

export default InputTile
