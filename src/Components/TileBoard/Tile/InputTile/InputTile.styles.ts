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
  0% {
    margin-left: 0rem;
  }
  25% {
    margin-left: 0.5rem;
  }
  75% {
    margin-left: -0.5rem;
  }
  100% {
    margin-left: 0rem;
  }
`

const invalidAnimation = css`
    @media screen and (prefers-reduced-motion: no-preference) {
        animation: ${shake} 0.2s ease-in-out 0s 2;
    }
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

    ${({ $valid }) => !$valid && invalidAnimation}
    &:last-of-type {
        margin-right: 0;
    }
`

export const InputContainer = styled.div`
    position: relative;
`
export const ImageContainer = styled.div`
    position: absolute;
    padding: 4px;
    right: 0;
    top: 0;

    svg {
        display: block;
        height: 18px;
        width: 18px;
        color: ${VariantBorder.invalid};
    }
`
