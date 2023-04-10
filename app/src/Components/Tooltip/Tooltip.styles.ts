import styled from 'styled-components'

import { PositionCSS } from './Tooltip.constants'

import type { TooltipProps } from '.'

type ToolTipContentContainerProps = {
    $defaultPosition: TooltipProps['defaultPosition']
    $isVisible: TooltipProps['isShowing']
}

export const TooltipContainer = styled.div`
    position: relative;
    pointer-events: auto;
`

export const TooltipContentContainer = styled.div<ToolTipContentContainerProps>`
    visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
    position: absolute;
    width: max-content;
    z-index: 9999;
    pointer-events: none;
    top: calc(100% + 5px);
    ${({ $defaultPosition }) =>
        PositionCSS[$defaultPosition ?? 'bottom-center']};
`
