import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

type GameState = {
    guesses: string[]
    currentGuess: string
    correctWord: string
    error: string
}

const initialState: GameState = {
    guesses: [],
    currentGuess: '',
    correctWord: '',
    error: '',
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGuessValue(state, action: PayloadAction<string>) {
            state.currentGuess = action.payload
        },
        registerGuess(state) {
            if (state.currentGuess.length === state.correctWord.length) {
                state.guesses = [...state.guesses, state.currentGuess]
                state.currentGuess = ''
            }
        },
    },
})

export const { setGuessValue, registerGuess } = gameSlice.actions
export default gameSlice.reducer
