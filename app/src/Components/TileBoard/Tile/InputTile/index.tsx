import { forwardRef } from 'react'

import { TileStyledTextInput } from './InputTile.styles'

export type InputTileProps = React.ComponentPropsWithoutRef<'input'> & {
    label?: string
}

const InputTile = forwardRef<HTMLInputElement, InputTileProps>(
    ({ label, ...inputProps }, ref) => {
        return (
            <TileStyledTextInput
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
