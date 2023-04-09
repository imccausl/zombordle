import { forwardRef } from 'react'

import { Tooltip } from '../../../Tooltip'

import { TileStyledTextInput } from './InputTile.styles'

export type InputTileProps = React.ComponentPropsWithoutRef<'input'> & {
    label?: string
    valid?: boolean
}

const InputTile = forwardRef<HTMLInputElement, InputTileProps>(
    ({ label, valid = true, ...inputProps }, ref) => {
        return (
            <Tooltip isShowing={!valid}>
                <Tooltip.Content>This field is required</Tooltip.Content>
                <TileStyledTextInput
                    $valid={valid}
                    ref={ref}
                    aria-label={label}
                    {...inputProps}
                    maxLength={1}
                    type="text"
                />
            </Tooltip>
        )
    },
)

InputTile.displayName = 'InputTile'

export default InputTile
