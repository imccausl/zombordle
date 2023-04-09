import styled from 'styled-components'

export const VariantColor = {
    default: 'transparent',
}

export const VariantBorder = {
    invalid: '#FF0800',
    default: '#8E8787',
}

type ValidationBorderProps = {
    $valid?: boolean
}

export const ValidationBorder = styled.div<ValidationBorderProps>`
    padding: 0;
    background-color: ${VariantColor.default};
    border: 2px solid
        ${({ $valid }) =>
            $valid ? VariantBorder.default : VariantBorder.invalid};
`
