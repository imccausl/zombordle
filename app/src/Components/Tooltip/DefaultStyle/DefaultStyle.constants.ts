import { css } from 'styled-components'

export const VariantThemes = {
    danger: {
        backgroundColor: '#ff0800',
        textColor: '#fff',
    },
    success: {
        backgroundColor: '#A7E648',
        textColor: '#000',
    },
    default: {
        backgroundColor: '#000',
        textColor: '#fff',
    },
}

export const PointerPositionCSS = {
    // TODO: top positions are temporary. not completed yet.
    'top-center': css`
        top: 0;
    `,
    'top-right': css`
        top: 0;
    `,
    'top-left': css`
        top: 0;
    `,
    'bottom-center': css`
        left: 50%;
        bottom: 100%;
        transform: translateX(-50%);
    `,
    'bottom-right': css`
        right: 92%;
        bottom: 100%;
        transform: translateX(92%);
    `,
    'bottom-left': css`
        right: 0;
        right: 10%;
        bottom: 100%;
    `,
    left: css`
        left: 0;
    `,
    right: css`
        right: 0;
    `,
}

export type Variants = keyof typeof VariantThemes
