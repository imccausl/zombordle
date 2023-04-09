import { css } from 'styled-components'

export const PositionCSS = {
    top: css`
        top: 0;
    `,
    'bottom-center': css`
        bottom: 0;
        left: 50%;
    `,
    'bottom-right': css`
        bottom: 0;
        left: 0;
        right: 100%;
    `,
    'bottom-left': css`
        bottom: 0;
        left: 100%;
        right: 0;
    `,
    left: css`
        left: 0;
    `,
    right: css`
        right: 0;
    `,
}

export type Positions = keyof typeof PositionCSS
