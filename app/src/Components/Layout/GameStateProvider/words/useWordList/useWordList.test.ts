import { renderHook } from '@testing-library/react'

import { useWordList } from '.'

describe('useWordList', () => {
    it.each([5, 6, 7] as const)(
        'should return a word list of the correct length',
        (wordListLength) => {
            const { result } = renderHook(() => useWordList(wordListLength))
            expect(result.current.wordList[0].length).toBe(wordListLength)
        },
    )

    it('should return a word list of length 5 if the word list length is greater than 7', () => {
        const { result } = renderHook(() => useWordList(8 as any))
        expect(result.current.wordList[0].length).toBe(5)
    })

    it('should return a word list of length 5 if the word list length is less than 5', () => {
        const { result } = renderHook(() => useWordList(4 as any))
        expect(result.current.wordList[0].length).toBe(5)
    })
})
