import { css } from 'styled-components'

export type Position = (typeof Position)[keyof typeof Position]

export const Position = {
    topCenter: 'top-center',
    topRight: 'top-right',
    topLeft: 'top-left',
    bottomCenter: 'bottom-center',
    bottomRight: 'bottom-right',
    bottomLeft: 'bottom-left',
    left: 'left',
    right: 'right',
} as const

export const PositionCSS = {
    [Position.topCenter]: css`
        top: 0;
    `,
    [Position.topRight]: css`
        right: 0;
    `,
    [Position.topLeft]: css`
        left: 0;
    `,
    [Position.bottomCenter]: css`
        left: 50%;
        right: 0;
        transform: translateX(calc(-50% - 14px));
    `,
    [Position.bottomRight]: css`
        left: 0;
        right: 0;
        transform: translateX(0);
    `,
    [Position.bottomLeft]: css`
        right: 0;
        left: 0;
        transform: translateX(-82%);
    `,
    [Position.left]: css`
        left: 0;
    `,
    [Position.right]: css`
        right: 0;
    `,
}
