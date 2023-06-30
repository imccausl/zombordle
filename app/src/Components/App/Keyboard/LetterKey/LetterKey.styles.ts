import { ThemeTokens } from '@zombordle/design-tokens'
import styled from 'styled-components'

export const VariantColor = {
    'correct-place': ThemeTokens.backgroundCorrect,
    'contains-letter': ThemeTokens.backgroundPresent,
    'no-letter': ThemeTokens.backgroundAbsent,
    default: ThemeTokens.backgroundDefault,
} as const

export type VariantColor = keyof typeof VariantColor

export const LetterKeyContainer = styled.button<{
    $variant?: VariantColor
    $flexGrow?: string
}>`
    display: flex;
    border: 1px solid transparent;
    background: ${({ $variant }) => VariantColor[$variant ?? 'default']};
    color: #fff;
    height: 58px;
    flex: ${({ $flexGrow }) => $flexGrow ?? '1'} 0 0;
    margin: 0 6px 0 0;
    font-size: 1.25em;
    border-radius: 4px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
`
