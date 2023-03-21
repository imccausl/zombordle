import { forwardRef } from 'react'

import {
    ImageContainer,
    InputContainer,
    TileStyledTextInput,
} from './InputTile.styles'
import ExclamationMark from './assets/exclamation.svg'

export type InputTileProps = {
    label?: string
    valid?: boolean
}

const InputTile = forwardRef<HTMLInputElement, InputTileProps>(
    ({ label, valid = true, ...inputProps }, ref) => {
        return (
            <InputContainer>
                {!valid && (
                    <ImageContainer>
                        <ExclamationMark />
                    </ImageContainer>
                )}
                <TileStyledTextInput
                    $valid={valid}
                    ref={ref}
                    aria-label={label}
                    {...inputProps}
                />
            </InputContainer>
        )
    },
)

InputTile.displayName = 'InputTile'

export default InputTile
