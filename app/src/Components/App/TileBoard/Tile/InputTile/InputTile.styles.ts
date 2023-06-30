import { ThemeTokens } from '@zombordle/design-tokens'
import styled from 'styled-components'

export const VariantColor = {
    default: ThemeTokens.backgroundBase,
}

export const VariantBorder = {
    focused: '#1F75FE',
}

const TileSize = {
    '5': '58px',
    '6': '51px',
    '7': '45px',
}

export const TileStyledTextInput = styled.input<{ $wordLength?: number }>`
    margin: 0 5px 0 0;
    padding: 0;
    text-align: center;
    color: ${ThemeTokens.fontBase};
    background-color: ${VariantColor.default};
    border-color: transparent;
    font-size: 2rem;
    font-weight: 600;
    height: 58px;
    width: 58px;
    text-transform: uppercase;
    caret-color: transparent;

    &:last-of-type {
        margin-right: 0;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 4px ${VariantBorder.focused};
    }

    @media only screen and (width <= 600px) {
        width: ${({ $wordLength }) =>
            TileSize[$wordLength?.toString() as keyof typeof TileSize]};
        height: ${({ $wordLength }) =>
            TileSize[$wordLength?.toString() as keyof typeof TileSize]};
    }
`

export const InputContainer = styled.div`
    position: relative;
`
