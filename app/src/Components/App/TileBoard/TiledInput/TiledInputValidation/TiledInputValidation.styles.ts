import { ThemeTokens } from '@zombordle/design-tokens'
import styled from 'styled-components'

export const VariantColor = {
    default: 'transparent',
}

export const VariantBorder = {
    invalid: ThemeTokens.borderInvalid,
    default: ThemeTokens.borderDefault,
    full: ThemeTokens.borderFull,
}

export type VariantBorder = keyof typeof VariantBorder

type ValidationBorderProps = {
    $variant?: VariantBorder
}

export const ValidationBorder = styled.div<ValidationBorderProps>`
    padding: 0;
    background-color: ${VariantColor.default};
    border: 2px solid ${({ $variant }) => VariantBorder[$variant ?? 'default']};
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

export const ErrorContainer = styled.span`
    text-align: left;
`
