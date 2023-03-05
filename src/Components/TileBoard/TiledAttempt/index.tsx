import { useMemo } from "react";
import Tile from "../Tile";
import { getVariant } from "../util";

type TilesProps = { word: string; correctWord: string };

const TiledAttempt: React.FC<TilesProps> = ({ word, correctWord }) => {
  const tiledWord = useMemo(() => {
    return word
      .toLowerCase()
      .split("")
      .map((letter: string, index: number) => {
        const tileVariant = getVariant({ correctWord, letter, index });
        return (
          <Tile key={`${letter}-${index}`} variant={tileVariant}>
            {letter}
          </Tile>
        );
      });
  }, [word, correctWord]);

  return <>{tiledWord}</>;
};

export default TiledAttempt;
