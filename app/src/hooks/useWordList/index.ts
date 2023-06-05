import { useMemo } from 'react'

import { fiveLetterWords } from '../../wordlists/fiveLetterWords'

export const useWordList = () => {
    return useMemo(() => fiveLetterWords, [])
}
