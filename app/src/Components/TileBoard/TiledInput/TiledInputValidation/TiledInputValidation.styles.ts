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

export const IconContainer = styled.div`
    text-align: left;
    width: 20px;
    height: 20px;
    margin-right: 10px;
`

export const MessageContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`

export const ErrorContainer = styled.p`
    text-align: left;
`
