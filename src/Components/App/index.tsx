import { useCallback, useReducer } from 'react'

import TileBoard from '../TileBoard'

import guessReducer, { registerGuess } from './slice'

const correctWord = 'found'

const App: React.FC = () => {
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
        />
    )
}

export default App
