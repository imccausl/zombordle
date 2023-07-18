import { render, screen } from '@testing-library/react'

import * as useWord from '../GameStateProvider/words/useWord'

import { StatsProvider } from './StatsProvider'

const mockState = JSON.stringify({
    '5': {
        guesses: ['trial', 'error', '5test'],
        hasPlayed: true,
        lastPlayed: 1688184000000,
        lastCompleted: 1688184000000,
    },
    '6': {
        guesses: ['season', 'peptic', '6ltest'],
        hasPlayed: false,
        lastPlayed: 1688184000000,
        lastCompleted: 1688184000000,
    },
    '7': {
        guesses: ['ductile', 'aground', '7letest'],
        hasPlayed: true,
        lastPlayed: 1688184000000,
        lastCompleted: 1688184000000,
    },
})

describe('StatsProvider', () => {
    beforeEach(() => {
        vi.setSystemTime(new Date(2023, 6, 1, 0, 0, 0, 0))
        window.localStorage.setItem('zombordle_gameState', mockState)
    })

    afterEach(() => {
        window.localStorage.clear()
    })

    it.todo('should throw and error if context is missing')

    describe('when user has guessed correctly (won)', () => {
        it.todo('should update the hasCompleted values in the game state')
        it.todo('should increment the current streak value')
        it.todo(
            'should increment the max streak value if current streak is greater than (previous) max streak',
        )
        it.todo('should reset the the current streak to 1 if no successive win')
        it.todo(
            'should not increment the max streak value if current streak is less than (previous) max streak',
        )
        it.todo(
            'should increment the number of attempts in the guess distribution',
        )
        it.todo('should set status to "win"')
        it.todo('should record the number of attempts it took to win')
    })

    describe('when user has used up all attempts (lost)', () => {
        it.todo('should update the hasPlayed values in the game state')
        it.todo('should reset the current streak to 0')
        it.todo('should set status to "loss"')
        it.todo('should increment the loss count in the distribution')
        it.todo('should record the number of attempts')
    })
})
