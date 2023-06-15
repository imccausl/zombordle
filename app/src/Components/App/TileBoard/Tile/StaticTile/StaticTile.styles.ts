import styled, { css, keyframes } from 'styled-components'

import type { TileProps } from '.'

export const VariantColor = {
    'correct-place': '#00b100',
    'contains-letter': '#ff9a00',
    'no-letter': '#d2d4dc',
    full: '#ffffff',
    default: '#ffffff',
}

export const VariantBorder = {
    'correct-place': VariantColor['correct-place'],
    'contains-letter': VariantColor['contains-letter'],
    'no-letter': VariantColor['no-letter'],
    default: '#d3d6da',
    full: '#8E8787',
}

export type VariantColor = keyof typeof VariantColor

const flip = (variant?: TileProps['variant']) => keyframes`
  0% {
    background-color: ${VariantColor.default};
    border: 2px solid ${VariantBorder.full};
    transform: scaleY(1);
  }

  50% {
    background-color: ${VariantColor.default};
    border: 2px solid ${VariantBorder.full};
    transform: scaleY(0);
  }

  100% {
    background-color: ${VariantColor[variant ?? 'default']};
    border: 2px solid ${VariantBorder[variant ?? 'default']};
    transform: scaleY(1);
  }
`

const postSubmitAnimation = (variant?: TileProps['variant']) => css`
    @media screen and (prefers-reduced-motion: no-preference) {
        animation-duration: 500ms;
        animation-name: ${flip(variant)};
        animation-timing-function: ease;
        animation-direction: normal;
        animation-fill-mode: forwards;
    }
`

const TileSize = {
    '5': '62px',
    '6': '55px',
    '7': '49px',
}

export const TileContainer = styled.li<TileProps & { hasLetter: boolean }>`
    list-style-type: none;
    text-indent: 0;
    margin: 0 5px 0 0;
    padding: 0;
    background-color: ${VariantColor.default};
    font-size: 2em;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid
        ${({ hasLetter }) =>
            hasLetter ? VariantBorder.full : VariantBorder.default};
    height: 62px;
    width: 62px;
    text-transform: uppercase;
    ${({ hasLetter, variant }) => hasLetter && postSubmitAnimation(variant)};
    animation-delay: ${({ animationDelayMultiplier }) =>
        `${(animationDelayMultiplier ?? 0) * 100}ms`};

    &:last-of-type {
        margin-right: 0;
    }

    @media screen and (prefers-reduced-motion: reduce) {
        background-color: ${({ variant }) =>
            VariantColor[variant ?? 'default']};
        border: 2px solid
            ${({ variant }) => VariantBorder[variant ?? 'default']};
    }

    @media only screen and (width <= 600px) {
        width: ${({ wordLength }) =>
            TileSize[(wordLength?.toString() as keyof typeof TileSize) ?? '5']};
        height: ${({ wordLength }) =>
            TileSize[(wordLength?.toString() as keyof typeof TileSize) ?? '5']};
    }
`
export const VisuallyHidden = styled.div`
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    text-transform: lowercase;
`
