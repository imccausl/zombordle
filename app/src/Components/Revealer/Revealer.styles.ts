import styled from 'styled-components'

import { PositionCSS } from './Revealer.constants'

import type { RevealerProps } from '.'

type RevealerContentContainerProps = {
    $defaultPosition: RevealerProps['defaultPosition']
    $isVisible: RevealerProps['isShowing']
}

export const RevealerContainer = styled.div`
    position: relative;
    pointer-events: auto;
`

export const RevealerContentContainer = styled.div<RevealerContentContainerProps>`
    visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
    position: absolute;
    width: max-content;
    z-index: 9999;
    pointer-events: none;
    top: calc(100% + 5px);
    ${({ $defaultPosition }) =>
        PositionCSS[$defaultPosition ?? 'bottom-center']};
`
