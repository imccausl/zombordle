import { css } from 'styled-components'

export const PositionCSS = {
    top: css`
        top: 0;
    `,
    'bottom-center': css`
        left: 50%;
        right: 0;
        transform: translateX(calc(-50% - 14px));
    `,
    'bottom-right': css`
        left: 0;
        right: 0;
        transform: translateX(0);
    `,
    'bottom-left': css`
        right: 0;
        left: 0;
        transform: translateX(-82%);
    `,
    left: css`
        left: 0;
    `,
    right: css`
        right: 0;
    `,
}

export type Positions = keyof typeof PositionCSS
