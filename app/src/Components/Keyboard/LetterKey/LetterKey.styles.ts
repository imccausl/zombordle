import styled from 'styled-components'

export const VariantColor = {
    'correct-place': '#00b100',
    'contains-letter': '#ff9a00',
    'no-letter': '#787c7e',
    default: '#d3d6da',
}

export type VariantColor = keyof typeof VariantColor

export const LetterKeyContainer = styled.button<{ $variant: VariantColor }>`
    display: flex;
    border: 1px solid transparent;
    background: ${({ $variant }) => VariantColor[$variant ?? 'default']};
    color: ${({ $variant }) =>
        $variant === 'no-letter' ? '#ffffff' : '#000000'};
    height: 58px;
    flex: 1 0 0;
    margin: 0 6px 0 0;
    font-size: 1.25em;
    border-radius: 4px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
`
