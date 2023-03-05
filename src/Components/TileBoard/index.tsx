import { useMemo } from "react";
import TiledAttempt from "./TiledAttempt";
import TiledBlank from "./TiledBlank";
import TiledInput from "./TiledInput";

import { ListContainer, TileRowContainer } from "./TileBoard.styles";
export type TileBoardProps = {
  guess: string;
  guesses: string[];
  correctWord: string;
};

const NUMBER_OF_ATTEMPTS = 5;

const TileBoard: React.FC<TileBoardProps> = ({
  guess,
  guesses,
  correctWord,
}) => {
  const attemptsRemaining = useMemo(
    () => NUMBER_OF_ATTEMPTS - guesses.length,
    [guesses]
  );

  const tiledGuesses = useMemo(
    () =>
      guesses.map((guess, index) => (
        <TileRowContainer key={`${guess}-${index + 1}`}>
          <TiledAttempt word={guess} correctWord={correctWord} />
        </TileRowContainer>
      )),
    [guesses, correctWord]
  );

  const tiledAttemptsRemaining = useMemo(
    () =>
      Array.from({ length: attemptsRemaining - 1 }).map((_, index) => (
        <TileRowContainer key={index}>
          <TiledBlank correctWordLength={correctWord.length} />
        </TileRowContainer>
      )),
    [correctWord, attemptsRemaining]
  );

  return (
    <ListContainer>
      {tiledGuesses}
      {Boolean(attemptsRemaining) && (
        <TileRowContainer>
          <TiledInput guess={guess} correctWordLength={correctWord.length} />
        </TileRowContainer>
      )}
      {Boolean(attemptsRemaining) && tiledAttemptsRemaining}
    </ListContainer>
  );
};

export default TileBoard;
