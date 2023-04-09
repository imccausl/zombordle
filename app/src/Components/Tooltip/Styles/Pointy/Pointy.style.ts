import styled from 'styled-components'

export const Container = styled.div`
    background-color: black;
    color: #fff;
    display: block;
    position: relative;
    transform: translateX(-50%);
    text-align: center;
    padding: 10px;
    bottom: -45px;
    border-radius: 0.5rem;
    box-shadow: 0 3px 10px 1px rgb(0 0 0 / 50%);

    &::before {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent black;
    }
`
