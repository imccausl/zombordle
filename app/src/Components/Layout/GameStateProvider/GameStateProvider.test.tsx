import { render } from '@testing-library/react'

import { SettingsProvider } from '../SettingsProvider'

import { GameStateProvider } from '.'

const renderComponent = () =>
    render(
        <SettingsProvider>
            <GameStateProvider />
        </SettingsProvider>,
    )

describe('GameStateProvider', () => {
    afterEach(() => {
        window.localStorage.clear()
    })

    it('should store the current date when first started on a day different from the previously started date', () => {
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

    it('should reset the game state when first started on a new day', () => {
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
