import styled from 'styled-components'

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;

    @media only screen and (width <= 400px) {
        justify-content: flex-start;
    }
`
