import { Form } from 'formula-one'
import styled, { css, keyframes } from 'styled-components'

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

type TileInputGroupProps = {
    $isInvalid?: boolean
}

export const TileInputGroup = styled.fieldset<TileInputGroupProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0;
    margin: 0;

    ${({ $isInvalid }) => $isInvalid && invalidAnimation}
`

export const StyledLegend = styled.legend`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

export const InputTileContainer = styled.div`
    margin: 0 5px 0 0;
    padding: 0;

    &:last-of-type {
        margin-right: 0;
    }
`

export const StyledForm = styled(Form)`
    position: relative;
`

export const StyledButton = styled.button.attrs({ tabIndex: -1 })`
    position: absolute;
    display: none;
    margin: 0 0 0 5px;
    right: -115px;
    top: 0;
    padding: 5px 10px;
    text-align: center;
    background-color: lightblue;
    border-radius: 0.15em;
    font-size: 1.5em;
    font-weight: 600;
    border: none;
    height: 55px;
`
