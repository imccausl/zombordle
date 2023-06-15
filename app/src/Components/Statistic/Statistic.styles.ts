import styled from 'styled-components'

export const StatContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const StatLabel = styled.h3`
    font-size: 0.9em;
    font-weight: normal;
    text-transform: capitalize;

    @media only screen and (width <= 600px) {
        font-size: 0.7em;
    }
`

export const StatValue = styled.span`
    display: block;
    font-weight: bold;
    font-size: 3em;

    @media only screen and (width <= 600px) {
        font-size: 2em;
    }
`
