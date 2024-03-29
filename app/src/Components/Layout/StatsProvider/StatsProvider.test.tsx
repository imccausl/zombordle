import { render } from '@testing-library/react'

import { GameStateProvider } from '../GameStateProvider'
import * as useWordModule from '../GameStateProvider/words/useWord'

import { StatsProvider, useStats } from '.'

const mockStateObject = {
    '5': {
        guesses: ['trial', 'error', 'smile', '5test'],
        hasPlayed: false,
        lastPlayed: null,
        lastCompleted: null,
    },
    '6': {
        guesses: ['season', 'peptic', '6ltest'],
        hasPlayed: false,
        lastPlayed: 1688184000000,
        lastCompleted: 1688184000000,
    },
    '7': {
        guesses: ['ductile', 'aground', '7letest'],
        hasPlayed: false,
        lastPlayed: 1688184000000,
        lastCompleted: 1688184000000,
    },
}

const mockState = JSON.stringify(mockStateObject)

describe('StatsProvider', () => {
    beforeEach(() => {
        vi.setSystemTime(new Date(2023, 6, 1, 0, 0, 0, 0))
        window.localStorage.setItem('zombordle_gameState', mockState)
    })

    afterEach(() => {
        window.localStorage.clear()
        vi.restoreAllMocks()
    })

    it('should throw an error if context is missing', () => {
        vi.spyOn(console, 'error').mockImplementation(() => {})
        const ContextlessHookCall: React.FC = () => {
            const { maxStreak } = useStats()

            return <div>{maxStreak}</div>
        }

        expect(() =>
            render(<ContextlessHookCall />),
        ).toThrowErrorMatchingInlineSnapshot(
            '[Error: useStats must be used within a StatsProvider]',
        )
    })

    describe('when user has guessed correctly (won)', () => {
        beforeEach(() => {
            vi.spyOn(useWordModule, 'useWord').mockReturnValue({
                correctWord: 'trial',
                wordList: ['error', '5test', 'trial'],
                isValidWord: () => true,
            })
        })

        it('should update the hasCompleted values in the game state', async () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const gameState = JSON.parse(
                window.localStorage.getItem('zombordle_gameState') as string,
            )['5']

            expect(gameState.hasPlayed).toBe(true)
            expect(gameState.lastCompleted).toBe(1688184000000)
            expect(gameState.lastPlayed).toBe(1688184000000)
        })

        it('should increment the current streak value', () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const statState = JSON.parse(
                window.localStorage.getItem('zombordle_stats') as string,
            )['5']
            const gameState = JSON.parse(
                window.localStorage.getItem('zombordle_gameState') as string,
            )

            expect(statState.currentStreak).toBe(1)

            vi.setSystemTime(new Date(2023, 6, 2, 0, 0, 0, 0))

            window.localStorage.setItem(
                'zombordle_gameState',
                JSON.stringify({
                    ...gameState,
                    '5': { ...gameState['5'], hasPlayed: false },
                }),
            )

            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            expect(
                JSON.parse(
                    window.localStorage.getItem('zombordle_stats') as string,
                )['5'].currentStreak,
            ).toBe(2)
        })

        it('should increment the max streak value if current streak is greater than (previous) max streak', () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const statState = JSON.parse(
                window.localStorage.getItem('zombordle_stats') as string,
            )['5']
            const gameState = JSON.parse(
                window.localStorage.getItem('zombordle_gameState') as string,
            )

            expect(statState.maxStreak).toBe(1)

            vi.setSystemTime(new Date(2023, 6, 2, 0, 0, 0, 0))

            window.localStorage.setItem(
                'zombordle_gameState',
                JSON.stringify({
                    ...gameState,
                    '5': { ...gameState['5'], hasPlayed: false },
                }),
            )

            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            expect(
                JSON.parse(
                    window.localStorage.getItem('zombordle_stats') as string,
                )['5'].maxStreak,
            ).toBe(2)
        })

        it('should reset the the current streak to 1 if no successive win', () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const statState = JSON.parse(
                window.localStorage.getItem('zombordle_stats') as string,
            )['5']
            const gameState = JSON.parse(
                window.localStorage.getItem('zombordle_gameState') as string,
            )

            expect(statState.currentStreak).toBe(1)

            vi.setSystemTime(new Date(2023, 6, 2, 0, 0, 0, 0))

            window.localStorage.setItem(
                'zombordle_gameState',
                JSON.stringify({
                    ...gameState,
                    '5': { ...gameState['5'], hasPlayed: false },
                }),
            )

            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            expect(
                JSON.parse(
                    window.localStorage.getItem('zombordle_stats') as string,
                )['5'].currentStreak,
            ).toBe(2)

            vi.setSystemTime(new Date(2023, 6, 4, 0, 0, 0, 0))

            window.localStorage.setItem(
                'zombordle_gameState',
                JSON.stringify({
                    ...gameState,
                    '5': {
                        ...gameState['5'],
                        lastCompleted: new Date(
                            2023,
                            6,
                            2,
                            0,
                            0,
                            0,
                            0,
                        ).getTime(),

                        hasPlayed: false,
                    },
                }),
            )

            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            expect(
                JSON.parse(
                    window.localStorage.getItem('zombordle_stats') as string,
                )['5'].currentStreak,
            ).toBe(1)
        })

        it('should not increment the max streak value if current streak is less than (previous) max streak', () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const statState = JSON.parse(
                window.localStorage.getItem('zombordle_stats') as string,
            )['5']
            const gameState = JSON.parse(
                window.localStorage.getItem('zombordle_gameState') as string,
            )

            expect(statState.maxStreak).toBe(1)

            vi.setSystemTime(new Date(2023, 6, 2, 0, 0, 0, 0))

            window.localStorage.setItem(
                'zombordle_gameState',
                JSON.stringify({
                    ...gameState,
                    '5': { ...gameState['5'], hasPlayed: false },
                }),
            )

            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            expect(
                JSON.parse(
                    window.localStorage.getItem('zombordle_stats') as string,
                )['5'].maxStreak,
            ).toBe(2)

            vi.setSystemTime(new Date(2023, 6, 4, 0, 0, 0, 0))

            window.localStorage.setItem(
                'zombordle_gameState',
                JSON.stringify({
                    ...gameState,
                    '5': {
                        ...gameState['5'],
                        lastCompleted: new Date(
                            2023,
                            6,
                            2,
                            0,
                            0,
                            0,
                            0,
                        ).getTime(),

                        hasPlayed: false,
                    },
                }),
            )

            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            expect(
                JSON.parse(
                    window.localStorage.getItem('zombordle_stats') as string,
                )['5'].maxStreak,
            ).toBe(2)
        })

        it('should increment the number of attempts in the guess distribution', () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const statState = JSON.parse(
                window.localStorage.getItem('zombordle_stats') as string,
            )['5']
            const gameState = JSON.parse(
                window.localStorage.getItem('zombordle_gameState') as string,
            )

            expect(statState.distribution['4']).toBe(1)

            vi.setSystemTime(new Date(2023, 6, 2, 0, 0, 0, 0))

            window.localStorage.setItem(
                'zombordle_gameState',
                JSON.stringify({
                    ...gameState,
                    '5': { ...gameState['5'], hasPlayed: false },
                }),
            )

            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            expect(
                JSON.parse(
                    window.localStorage.getItem('zombordle_stats') as string,
                )['5'].distribution['4'],
            ).toBe(2)
        })

        it('should set status to "win"', () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const statState = JSON.parse(
                window.localStorage.getItem('zombordle_stats') as string,
            )['5']

            expect(statState.status).toBe('win')
        })

        it('should record the number of attempts it took to win', () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const statState = JSON.parse(
                window.localStorage.getItem('zombordle_stats') as string,
            )['5']

            expect(statState.attempts).toBe(4)
        })
    })

    describe('when user has used up all attempts (lost)', () => {
        beforeEach(() => {
            vi.spyOn(useWordModule, 'useWord').mockReturnValue({
                correctWord: 'stock',
                wordList: ['error', '5test', 'trial'],
                isValidWord: () => true,
            })

            window.localStorage.setItem(
                'zombordle_gameState',
                JSON.stringify({
                    ...mockStateObject,
                    '5': {
                        ...mockStateObject['5'],
                        guesses: [
                            'trial',
                            'error',
                            'smile',
                            '5test',
                            'adeiu',
                            'bored',
                        ],
                    },
                }),
            )

            vi.spyOn(window, 'alert').mockImplementation(() => {})
        })

        afterEach(() => {
            vi.resetAllMocks()
        })

        it('should update the hasPlayed values in the game state', () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const gameState = JSON.parse(
                window.localStorage.getItem('zombordle_gameState') as string,
            )['5']

            expect(gameState.hasPlayed).toBe(true)
            expect(gameState.lastPlayed).toBe(1688184000000)
            expect(gameState.lastCompleted).toBe(null)
        })

        it('should reset the current streak to 0', () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const statState = JSON.parse(
                window.localStorage.getItem('zombordle_stats') as string,
            )['5']

            expect(statState.currentStreak).toBe(0)
        })

        it('should set status to "loss"', () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const statState = JSON.parse(
                window.localStorage.getItem('zombordle_stats') as string,
            )['5']

            expect(statState.status).toBe('loss')
        })

        it('should increment the loss count in the distribution', () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const statState = JSON.parse(
                window.localStorage.getItem('zombordle_stats') as string,
            )['5']

            expect(statState.distribution.loss).toBe(1)
        })

        it('should record the number of attempts', () => {
            render(
                <GameStateProvider>
                    <StatsProvider />
                </GameStateProvider>,
            )

            const statState = JSON.parse(
                window.localStorage.getItem('zombordle_stats') as string,
            )['5']

            expect(statState.attempts).toBe(6)
        })
    })
})
