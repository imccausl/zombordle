import { useCallback, useReducer } from 'react'

import TileBoard from '../TileBoard'

import guessReducer, { registerGuess, setGuessValue } from './slice'

const correctWord = 'dformation'

const App: React.FC = () => {
    const [state, dispatch] = useReducer(guessReducer, {
        currentGuess: '',
        guesses: [],
        correctWord,
        error: '',
    })
    const handleOnChange = useCallback(
        (value: string) => void dispatch(setGuessValue(value)),
        [],
    )
    const handleOnSubmit = useCallback(() => void dispatch(registerGuess()), [])

    return (
        <TileBoard
            onChange={handleOnChange}
            onSubmit={handleOnSubmit}
            guess={state.currentGuess}
            guesses={state.guesses}
            correctWord={correctWord}
        />
    )
}

export default App
