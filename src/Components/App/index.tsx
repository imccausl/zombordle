import { useReducer, useCallback } from "react";
import TileBoard from "../TileBoard";
import guessReducer, { setGuessValue, deleteLetter, registerGuess } from "./slice";

const correctWord = "dformation";
const KEYS = {
  Backspace: "Backspace",
  Enter: "Enter",
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(guessReducer, {
    currentGuess: "",
    guesses: [],
    correctWord,
    error: "",
  });
  const handleOnChange = useCallback((value: string) => dispatch(setGuessValue(value)), [])

  return (
    <TileBoard
    onChange={handleOnChange}
      guess={state.currentGuess}
      guesses={state.guesses}
      correctWord={correctWord}
    />
  );
};

export default App;
