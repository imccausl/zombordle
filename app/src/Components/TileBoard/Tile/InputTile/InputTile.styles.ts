import styled from 'styled-components'

export const VariantColor = {
    default: '#ffffff',
}

export const VariantBorder = {
    focused: '#1F75FE',
}

export const TileStyledTextInput = styled.input`
    margin: 0 5px 0 0;
    padding: 0;
    text-align: center;
    background-color: ${VariantColor.default};
    border-color: transparent;
    font-size: 2rem;
    font-weight: 600;
    height: 51px;
    width: 51px;
    text-transform: uppercase;
    caret-color: transparent;

    &:last-of-type {
        margin-right: 0;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 4px ${VariantBorder.focused};
        margin: 1px;
    }
`

export const InputContainer = styled.div`
    position: relative;
`
