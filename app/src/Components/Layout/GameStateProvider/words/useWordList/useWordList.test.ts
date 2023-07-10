import { renderHook } from '@testing-library/react'

import { useWordList } from '.'

describe('useWordList', () => {
    it.each([5, 6, 7] as const)(
        'should return a word list of the correct length',
        (wordListLength) => {
            const { result } = renderHook(() => useWordList(wordListLength))
            expect(result.current[0].length).toBe(wordListLength)
        },
    )

    it.only('should return a word list of length 5 if the word list length is not 5, 6, or 7', () => {
        const { result } = renderHook(() => useWordList(8 as any))
        expect(result.current[0].length).toBe(5)
    })
})
