import { useMemo } from "react";
import InputTile from "../Tile/InputTile";
import { TileInputGroup } from './TiledInput.styles'

export type TiledInputProps = {
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
          <InputTile type="text" key={index} /> 
        );
      });
  }, [guess, correctWordLength]);

  return <TileInputGroup role="list">{tiledBlank}</TileInputGroup>;
};

export default TiledInput;
