import { render } from '@testing-library/react'
import { useEffect } from 'react'

import { SettingsProvider } from '../SettingsProvider'

import { GameStateProvider, useGameState } from '.'

const WrappedGameStateComponent = () => {
    const { setGameStarted } = useGameState()

    useEffect(() => {
        setGameStarted()
    }, [setGameStarted])

    return <div />
}

const renderComponent = () =>
    render(
        <SettingsProvider>
            <GameStateProvider>
                <WrappedGameStateComponent />
            </GameStateProvider>
        </SettingsProvider>,
    )

describe('GameStateProvider', () => {
    afterEach(() => {
        window.localStorage.clear()
    })

    it.only('should reset game state after each day', () => {
        vi.setSystemTime(new Date(2023, 6, 1))

        renderComponent()
        expect(window.localStorage.getItem('zombordle_started')).toBe(
            JSON.stringify('Sat Jul 01 2023'),
        )

        // simulate new day + user refresh
        vi.setSystemTime(new Date(2023, 6, 2))
        renderComponent()

        expect(window.localStorage.getItem('zombordle_started')).toBe(
            JSON.stringify('Sun Jul 02 2023'),
        )
    })
})
