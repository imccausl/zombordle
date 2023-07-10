import { renderHook } from '@testing-library/react'

import * as wordListModule from '../useWordList'

import { useWord } from '.'

const mockWordList = ['word1', 'word2', 'word3']

describe('useWord', () => {
    beforeEach(() => {
        vi.spyOn(wordListModule, 'useWordList').mockReturnValue(mockWordList)
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    it('should return a new word from word list every day', () => {
        vi.setSystemTime(new Date(2023, 7, 1))
        const { result: firstResult } = renderHook(() => useWord(5))

        expect(firstResult.current.correctWord).toBe('word3')

        vi.setSystemTime(new Date(2023, 7, 2))
        const { result: secondResult } = renderHook(() => useWord(5))

        expect(secondResult.current.correctWord).toBe('word1')

        vi.setSystemTime(new Date(2023, 7, 3))
        const { result: thirdResult } = renderHook(() => useWord(5))

        expect(thirdResult.current.correctWord).toBe('word2')
    })

    describe('isValidWord', () => {
        it('should return true if the word is in the word list', () => {
            const { result } = renderHook(() => useWord(5))

            expect(result.current.isValidWord('word1')).toBe(true)
        })

        it('should not return true if the word is in the word list', () => {
            const { result } = renderHook(() => useWord(5))

            expect(result.current.isValidWord('word4')).toBe(false)
        })
    })
})
