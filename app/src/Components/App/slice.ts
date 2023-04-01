import { createSlice } from '@reduxjs/toolkit'

type GameState = {
    guesses: string[]
    correctWord: string
}

const initialState: GameState = {
    guesses: [],
    correctWord: '',
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        registerGuess(state, action) {
            state.guesses = [...state.guesses, action.payload]
        },
    },
})

export const { registerGuess } = gameSlice.actions
export default gameSlice.reducer
