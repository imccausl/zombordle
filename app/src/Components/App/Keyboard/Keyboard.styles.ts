import styled from 'styled-components'

import BackspaceIcon from './assets/backspace_key.svg?react'
import EnterIcon from './assets/enter_key.svg?react'

export const KeyboardContainer = styled.section`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin-top: 10px;
    padding: 0 8px;
    width: 100%;
`

export const RowContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    width: 100%;
`

export const BackspaceKeyIcon = styled(BackspaceIcon)`
    width: 30px;
    height: 30px;
`

export const EnterKeyIcon = styled(EnterIcon)`
    height: 25px;
    width: 25px;
`
