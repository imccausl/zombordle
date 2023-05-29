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
    flex: 1 1 0;
`

export const StyledH1 = styled.h1`
    font-family: 'Roboto Slab', Georgia, serif;
    font-size: 36px;
    text-align: center;
    flex: 2 0 0;
    padding: 5px;
`
