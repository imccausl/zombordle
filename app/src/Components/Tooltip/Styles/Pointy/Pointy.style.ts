import styled from 'styled-components'

import { type Positions } from '../../Tooltip.constants'

import { PositionCSS, VariantThemes, type Variants } from './Pointy.constants'

type ColorTypes = keyof (typeof VariantThemes)[keyof typeof VariantThemes]
type ContainerProps = {
    $variant: Variants
    $defaultPosition: Positions
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
    transform: translateX(-50%);
    text-align: center;
    padding: 10px;
    bottom: -45px;
    left: 50%;
    border-radius: 0.5rem;
    box-shadow: 0 3px 10px 1px rgb(0 0 0 / 50%);

    &::before {
        content: '';
        position: absolute;
        ${({ $defaultPosition }) => PositionCSS[$defaultPosition]}
        transform: translateX(92%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent
            ${({ $variant }) => getBackgroundColor($variant)};
    }
`