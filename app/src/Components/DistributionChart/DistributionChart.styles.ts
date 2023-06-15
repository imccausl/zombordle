import styled from 'styled-components'

export const DistributionContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 10px;
`

export const YAxisContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
`

export const ItemLabel = styled.div`
    font-weight: bold;
    font-size: 1em;
    text-transform: capitalize;
    padding: 5px;
`
export const HorizontalBar = styled.div<{ percent: number }>`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    width: ${({ percent }) => `${percent}%`};
    height: 22px;
    color: white;
    background: gray;
`
export const BarLabel = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 8px;
    font-size: 1em;
    width: 100%;
    font-weight: bold;
`

export const ItemContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`
