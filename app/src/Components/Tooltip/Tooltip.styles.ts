import styled, { css } from 'styled-components'

import type { TooltipProps } from '.'

type ToolTipContentContainerProps = {
    $defaultPosition: TooltipProps['defaultPosition']
}

export const TooltipContainer = styled.div`
    position: relative;
`

const PositionCSS = {
    top: css`
        top: 0;
    `,
    bottom: css`
        bottom: 0;
    `,
    left: css`
        left: 0;
    `,
    right: css`
        right: 0;
    `,
}

export const TooltipContentContainer = styled.div<ToolTipContentContainerProps>`
    position: absolute;
    ${({ $defaultPosition }) => PositionCSS[$defaultPosition ?? 'bottom']}
`
