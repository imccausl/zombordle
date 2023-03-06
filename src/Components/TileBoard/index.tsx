import { useMemo } from "react";
import TiledAttempt from "./TiledAttempt";
import TiledBlank from "./TiledBlank";
import TiledInput from "./TiledInput";

import { ListContainer, TileRowContainer, InputRowContainer } from "./TileBoard.styles";
export type TileBoardProps = {
  guess: string;
  guesses: string[];
  correctWord: string;
  onChange: (value: string) => void
};

const MAX_ATTEMPTS = 6;

const TileBoard: React.FC<TileBoardProps> = ({
  guess,
  guesses,
  correctWord,
  onChange,
}) => {
  const attemptsRemaining = useMemo(
    () => MAX_ATTEMPTS - guesses.length,
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
        <TileRowContainer role="listitem" key={index}>
          <TiledBlank correctWordLength={correctWord.length} />
        </TileRowContainer>
      )),
    [correctWord, attemptsRemaining]
  );

  let inputRowContainerPosition: 'middle' | 'top' | 'bottom' = 'middle'
  if (guesses.length === 0) {
    inputRowContainerPosition = 'top'
  } else if (guesses.length === MAX_ATTEMPTS - 1) {
    inputRowContainerPosition = 'bottom'
  }

  return (
    <>
      {Boolean(guesses.length) && (<ListContainer role="list">
        {tiledGuesses}
      </ListContainer>)}
      {Boolean(attemptsRemaining) && (
        <ListContainer as="div">
        <InputRowContainer position={inputRowContainerPosition}>
          <TiledInput value={guess} length={correctWord.length} onChange={onChange} />
        </InputRowContainer>
        </ListContainer>
      )}
      {Boolean(attemptsRemaining) && (<ListContainer role="list">{tiledAttemptsRemaining}</ListContainer>)}
    </>
  );
};

export default TileBoard;
