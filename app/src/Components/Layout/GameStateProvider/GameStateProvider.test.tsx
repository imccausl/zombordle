import { render, screen } from '@testing-library/react'

import { fullInitialGameState, initialGameState } from './useCurrentGameState'
import * as wordListModule from './words/useWordList'

import { GameStateProvider, useGameState } from '.'

const renderComponent = () => render(<GameStateProvider />)

describe('GameStateProvider', () => {
    afterEach(() => {
        window.localStorage.clear()
    })

    describe('daily reset', () => {
        it('should store the current date when first started on a day different from the previously started date', () => {
            vi.setSystemTime(new Date(2023, 6, 1))
            window.localStorage.setItem(
                'zombordle_started',
                JSON.stringify('Sat Jul 01 2023'),
            )
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
            window.localStorage.setItem(
                'zombordle_started',
                JSON.stringify('Sat Jul 01 2023'),
            )
            renderComponent()
            const gameState = {
                '5': { ...initialGameState, guesses: ['a', 'b', 'c'] },
                '6': { ...initialGameState },
                '7': { ...initialGameState },
            }

            window.localStorage.setItem(
                'zombordle_gameState',
                JSON.stringify(gameState),
            )

            expect(window.localStorage.getItem('zombordle_gameState')).toBe(
                JSON.stringify(gameState),
            )

            // simulate new day + user refresh
            vi.setSystemTime(new Date(2023, 6, 2))
            renderComponent()

            expect(window.localStorage.getItem('zombordle_gameState')).toBe(
                JSON.stringify(fullInitialGameState),
            )
        })
    })

    describe('hasWon', () => {
        const HasWonTestComponent: React.FC = () => {
            const { hasWon } = useGameState()
            return <div>{hasWon.toString()}</div>
        }

        it.each`
            description                        | containsCorrectWord | guesses                        | correctWord
            ${'contains correct word'}         | ${true}             | ${['test', 'word', 'correct']} | ${'correct'}
            ${'does not contain correct word'} | ${false}            | ${['test', 'word', 'wrong']}   | ${'correct'}
        `(
            'returns $containsCorrectWord when guess list $description',
            ({ guesses, containsCorrectWord, correctWord }) => {
                vi.setSystemTime(new Date(2023, 6, 1))
                window.localStorage.setItem(
                    'zombordle_started',
                    JSON.stringify('Sat Jul 01 2023'),
                )

                vi.spyOn(wordListModule, 'useWordList').mockReturnValue([
                    correctWord,
                ])

                const gameState = Object.assign({}, fullInitialGameState)
                gameState['5'].guesses = guesses
                window.localStorage.setItem(
                    'zombordle_gameState',
                    JSON.stringify(gameState),
                )

                render(
                    <GameStateProvider>
                        <HasWonTestComponent />
                    </GameStateProvider>,
                )

                screen.getByText(containsCorrectWord)
            },
        )
    })
})
