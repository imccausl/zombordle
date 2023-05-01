import styled from 'styled-components'

import { type Position } from '../../Revealer/Revealer.constants'

import {
    PointerPositionCSS as PointerPositionCSS,
    VariantThemes,
    type Variants,
} from './DefaultStyle.constants'

type ColorTypes = keyof (typeof VariantThemes)[keyof typeof VariantThemes]
type ContainerProps = {
    $variant: Variants
    $defaultPosition: Position
}

const getColor = (colorType: ColorTypes, variant?: Variants) =>
    VariantThemes[variant ?? 'default'][colorType]

const getTextColor = (variant?: Variants) =>
    getColor('textColor', variant ?? 'default')

const getBackgroundColor = (variant?: Variants) =>
    getColor('backgroundColor', variant ?? 'default')

export const Container = styled.div<ContainerProps>`
    background-color: ${({ $variant }) => getBackgroundColor($variant)};
    color: ${({ $variant }) => getTextColor($variant)};
    font-weight: normal;
    display: block;
    position: relative;
    text-align: center;
    max-width: 100%;
    padding: 10px;
    border-radius: 0.5rem;
    box-shadow: 0 3px 10px 1px rgb(0 0 0 / 50%);

    &::before {
        content: '';
        position: absolute;
        ${({ $defaultPosition }) => PointerPositionCSS[$defaultPosition]}
        transform: translateX(92%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent
            ${({ $variant }) => getBackgroundColor($variant)};
    }
`
