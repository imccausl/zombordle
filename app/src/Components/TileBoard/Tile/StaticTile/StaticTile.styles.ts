import styled from 'styled-components'

import type { TileProps } from '.'

export const VariantColor = {
    'correct-place': '#00b100',
    'contains-letter': '#ff9a00',
    'no-letter': '#d2d4dc',
    default: '#ffffff',
}

export const VariantBorder = {
    'correct-place': VariantColor['correct-place'],
    'contains-letter': VariantColor['contains-letter'],
    'no-letter': VariantColor['no-letter'],
    default: '#8E8787',
}

export type VariantColor = keyof typeof VariantColor

export const TileContainer = styled.li<TileProps>`
    list-style-type: none;
    text-indent: 0;
    margin: 0 5px 0 0;
    padding: 0;
    background-color: ${({ variant }) => VariantColor[variant ?? 'default']};
    font-size: 2em;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid ${({ variant }) => VariantBorder[variant ?? 'default']};
    width: 55px;
    height: 55px;
    text-transform: uppercase;

    &:last-of-type {
        margin-right: 0;
    }
`
export const VisuallyHidde = styled.div`
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
`
