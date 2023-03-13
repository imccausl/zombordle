import styled from 'styled-components'

import { Form } from '../InputValidation/Form'

export const TileInputGroup = styled.ul`
    text-indent: 0;
    list-style-type: none;
    padding: 0;
    margin: 0;
`

export const InputTileContainer = styled.li`
    list-style-type: none;
    text-indent: 0;
    margin: 0 5px 0 0;
    padding: 0;

    &:last-of-type {
        margin-right: 0;
    }
`

export const StyledForm = styled(Form)`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const StyledButton = styled.button`
    position: absolute;
    display: block;
    margin: 0 0 0 5px;
    right: -115px;
    padding: 5px 10px;
    text-align: center;
    background-color: lightblue;
    border-radius: 0.15em;
    font-size: 1.5em;
    font-weight: 600;
    border: none;
    height: 55px;
`
