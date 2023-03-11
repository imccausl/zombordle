import styled from 'styled-components'

export const VariantColor = {
    'correct-place': '#00b100',
    'contains-letter': '#ff9a00',
    'no-letter': '#d2d4dc',
    default: '#ffffff',
}

export const VariantBorder = {
    'correct-place': VariantColor['correct-place'],
    'contains-letter': VariantColor['contains-letter'],
    'no-letter': VariantColor['no-letter'],
    default: '#d2d4dc',
}

export const TileStyledTextInput = styled.input.attrs(() => ({
    type: 'text',
    maxLength: 1,
}))`
    margin: 0 5px 0 0;
    padding: 0;
    text-align: center;
    background-color: ${VariantColor.default};
    font-size: 2em;
    font-weight: 600;
    border: 2px solid ${VariantBorder.default};
    width: 55px;
    height: 55px;
    text-transform: uppercase;
    caret-color: transparent;

    &:last-of-type {
        margin-right: 0;
    }
`
