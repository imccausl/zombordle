import { useReducer, useEffect } from "react";
import TileBoard from "../TileBoard";
import guessReducer, { addLetter, deleteLetter, registerGuess } from "./slice";

const correctWord = "dformation";
const KEYS = {
  Backspace: "Backspace",
  Enter: "Enter",
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(guessReducer, {
    currentGuess: "",
    guesses: ["foundation", "loundation"],
    correctWord,
    error: "",
  });
  const handleKeyup = (event: KeyboardEvent) => {
    switch (event.key) {
      case KEYS.Enter:
        dispatch(registerGuess());
        break;
      case KEYS.Backspace:
        dispatch(deleteLetter());
        break;
      default:
        dispatch(addLetter(event.key));
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  return (
    <TileBoard
      guess={state.currentGuess}
      guesses={state.guesses}
      correctWord={correctWord}
    />
  );
};

export default App;
