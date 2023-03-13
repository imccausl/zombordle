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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
