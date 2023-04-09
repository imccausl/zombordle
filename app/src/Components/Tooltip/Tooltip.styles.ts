import styled from 'styled-components'

import { PositionCSS } from './Tooltip.constants'

import type { TooltipProps } from '.'

type ToolTipContentContainerProps = {
    $defaultPosition: TooltipProps['defaultPosition']
}

export const TooltipContainer = styled.div`
    position: relative;
    pointer-events: auto;
`

export const TooltipContentContainer = styled.div<ToolTipContentContainerProps>`
    position: absolute;
    width: max-content;
    left: auto;
    right: auto;
    z-index: 9999;
    pointer-events: none;

    ${({ $defaultPosition }) =>
        PositionCSS[$defaultPosition ?? 'bottom-center']}
`
