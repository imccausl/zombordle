import { ThemeTokens } from '@zombordle/design-tokens'
import Link from 'next/link'
import styled from 'styled-components'

export const StyledHeader = styled.header`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    height: 65px;
    width: 100%;
    border-bottom: ${ThemeTokens.borderDefault} solid 1px;

    @media only screen and (width <= 600px) {
        height: 40px;
    }
`
export const StyledIconButton = styled.button`
    border: none;
    color: ${ThemeTokens.fontBase};
    background: transparent;
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 5px;

    @media only screen and (width <= 600px) {
        width: 35px;
        height: 35px;
    }
`
export const StyledLink = styled(Link)`
    border: none;
    background: transparent;
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 5px;

    @media only screen and (width <= 600px) {
        width: 35px;
        height: 35px;
    }
`

export const StyledH1 = styled.h1`
    font-family: 'Roboto Slab', Georgia, serif;
    font-size: 36px;
    text-align: center;
    flex: 2 0 0;
    padding: 5px;

    @media only screen and (width <= 600px) {
        text-align: left;
        font-size: 30px;
    }
`

export const ActionContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    flex: 1 1 0;
`

export const Placeholder = styled.div`
    flex: 1 1 0;

    @media only screen and (width <= 600px) {
        flex: 0 1 0;
    }
`

export const StyledNav = styled.nav`
    height: 100%;
    width: 100%;
`

export const NavListContainer = styled.ul`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
`

export const NavListItem = styled.li`
    margin: 0;
    padding: 0;
    width: 100%;
`
