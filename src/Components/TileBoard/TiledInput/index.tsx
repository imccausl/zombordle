import { useMemo } from "react";
import Tile from "../Tile";
import { TileGroup } from '../TileBoard.styles'

type TiledInputProps = {
  correctWordLength: number;
  guess: string;
};

const TiledInput: React.FC<TiledInputProps> = ({
  guess,
  correctWordLength,
}) => {
  const tiledBlank = useMemo(() => {
    return guess
      .concat(" ".repeat(correctWordLength - (guess.length || 0)))
      .split("")
      .map((letter: string, index: number) => {
        return (
          <Tile key={index} variant="default">
            {letter}
          </Tile>
        );
      });
  }, [guess, correctWordLength]);

  return <TileGroup>{tiledBlank}</TileGroup>;
};

export default TiledInput;
