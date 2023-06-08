import { forwardRef } from 'react'

import { TileStyledTextInput } from './InputTile.styles'

export type InputTileProps = React.ComponentPropsWithoutRef<'input'> & {
    label?: string
    wordLength?: number
}

const InputTile = forwardRef<HTMLInputElement, InputTileProps>(
    ({ label, wordLength, ...inputProps }, ref) => {
        return (
            <TileStyledTextInput
                $wordLength={wordLength}
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
