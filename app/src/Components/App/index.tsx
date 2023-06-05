import { useCallback, useReducer } from 'react'

import TileBoard from '../TileBoard'
import { useWord } from '../hooks/useWord'
import { useWordList } from '../hooks/useWordList'

import guessReducer, { registerGuess } from './slice'

const App: React.FC = () => {
    const correctWord = useWord()
    const wordList = useWordList()

    const [state, dispatch] = useReducer(guessReducer, {
        guesses: [],
        correctWord,
    })

    const handleOnSubmit = useCallback(
        (value: string) => void dispatch(registerGuess(value)),
        [],
    )

    return (
        <TileBoard
            onSubmit={handleOnSubmit}
            guesses={state.guesses}
            correctWord={state.correctWord}
            wordList={wordList}
        />
    )
}

export default App
