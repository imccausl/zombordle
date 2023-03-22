import styled from 'styled-components'

type TileStyledTextInputProps = {
    $valid: boolean
}
export const VariantColor = {
    default: '#ffffff',
}

export const VariantBorder = {
    invalid: '#FF0800',
    focused: '#1F75FE',
    default: '#8E8787',
}

export const TileStyledTextInput = styled.input.attrs({
    type: 'text',
    maxLength: 1,
})<TileStyledTextInputProps>`
    margin: 0 5px 0 0;
    padding: 0;
    text-align: center;
    background-color: ${VariantColor.default};
    font-size: 2em;
    font-weight: 600;
    border: 2px solid
        ${({ $valid }) =>
            $valid ? VariantBorder.default : VariantBorder.invalid};
    width: 55px;
    height: 55px;
    text-transform: uppercase;
    caret-color: transparent;

    &:last-of-type {
        margin-right: 0;
    }

    &:focus {
        outline: none;
        border-radius: 5px;
        border: 2px solid ${VariantBorder.focused};
        box-shadow: 0 0 0 2px ${VariantBorder.focused};
        margin: 1px;
    }
`

export const InputContainer = styled.div`
    position: relative;
`
export const ImageContainer = styled.div`
    position: absolute;
    padding: 4px;
    right: 0;
    top: 0;

    svg {
        display: block;
        height: 18px;
        width: 18px;
        color: ${VariantBorder.invalid};
    }
`
