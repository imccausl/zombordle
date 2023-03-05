import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

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

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addLetter(state, action: PayloadAction<string>) {
      

      if (state.currentGuess.length < state.correctWord.length && alphabet.includes(action.payload)) {
        state.currentGuess = state.currentGuess.concat(action.payload)
      }
    },
    deleteLetter(state) {
      if (state.currentGuess.length !== 0) {
        state.currentGuess = state.currentGuess.slice(0, -1)
      }
    },
    registerGuess(state) {
      if (state.currentGuess.length === state.correctWord.length) {
        state.guesses = [...state.guesses, state.currentGuess]
        state.currentGuess = ''
      }
    }
  }
})

export const { addLetter, deleteLetter, registerGuess } = gameSlice.actions
export default gameSlice.reducer
