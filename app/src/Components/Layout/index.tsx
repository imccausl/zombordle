import styled from 'styled-components'

import { GameStateProvider } from './GameStateProvider'
import { Header } from './Header'
import { SettingsProvider, useSettings } from './SettingsProvider'
import { StatsProvider } from './StatsProvider'
import { ThemeProvider } from './ThemeProvider'

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: calc(100% - 65px);
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    overflow: hidden;

    @media only screen and (width <= 600px) {
        height: calc(100% - 40px);
    }
`
const GameProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { wordLength } = useSettings()

    return (
        <GameStateProvider wordLength={wordLength}>
            <StatsProvider wordLength={wordLength}>{children}</StatsProvider>
        </GameStateProvider>
    )
}
export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider>
            <SettingsProvider>
                <GameProviders>
                    <Header />
                    <Main>{children}</Main>
                </GameProviders>
            </SettingsProvider>
        </ThemeProvider>
    )
}
