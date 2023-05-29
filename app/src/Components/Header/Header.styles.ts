import styled from 'styled-components'

export const StyledHeader = styled.header`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    height: 65px;
    width: 100%;
    border-bottom: lightgrey solid 1px;
`
export const StyledIconButton = styled.button`
    border: none;
    background: transparent;
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 5px;
`
export const SoundControlContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
`

export const StyledH1 = styled.h1`
    text-align: center;
    flex-grow: 2;
    padding: 5px;
`
