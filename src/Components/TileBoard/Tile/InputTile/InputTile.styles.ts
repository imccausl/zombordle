import styled, { css, keyframes } from 'styled-components'

type TileStyledTextInputProps = {
    $valid: boolean
}
export const VariantColor = {
    default: '#ffffff',
}

export const VariantBorder = {
    invalid: '#FF0000',
    default: '#d2d4dc',
}

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`

const invalidAnimation = css`
    ${shake} cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
`

const invalidShake = css`
    animation: ${invalidAnimation};
`

export const TileStyledTextInput = styled.input.attrs({
    type: 'text',
    maxLength: 1,
})<TileStyledTextInputProps>`
    margin: 0 5px 0 0;
    padding: 0;
    text-align: center;
    background-color: ${VariantColor.default};
    font-size: 2em;
    font-weight: 600;
    border: 2px solid
        ${({ $valid }) =>
            $valid ? VariantBorder.default : VariantBorder.invalid};
    width: 55px;
    height: 55px;
    text-transform: uppercase;
    caret-color: transparent;
    ${({ $valid }) => !$valid && invalidShake}
    &:last-of-type {
        margin-right: 0;
    }
`
