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

export const PositionCSS = {
    top: css`
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
        left: 92%;
        bottom: 100%;
        transform: translateX(-92%);
    `,
    left: css`
        left: 0;
    `,
    right: css`
        right: 0;
    `,
}

export type Variants = keyof typeof VariantThemes
