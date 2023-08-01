import styled from 'styled-components'

import { PositionCSS } from './Revealer.constants'

import type { RevealerProps } from '.'

type RevealerContentContainerProps = {
    $defaultPosition: RevealerProps['defaultPosition']
}

export const RevealerContainer = styled.div`
    position: relative;
    pointer-events: auto;
`

export const RevealerContentContainer = styled.div<RevealerContentContainerProps>`
    position: absolute;
    width: max-content;
    z-index: 9999;
    pointer-events: none;
    top: calc(100% + 5px);
    ${({ $defaultPosition }) =>
        PositionCSS[$defaultPosition ?? 'bottom-center']};

    /**
    * temporary fix to infinite repositioning issue when screen width is equal to 
    * the revealer content width. Feels a tiny bit hacky and may want to go about
    * this a bit more dynamically.
    */
    @media screen and (device-width <= 530px) {
        width: 270px;
    }
`
