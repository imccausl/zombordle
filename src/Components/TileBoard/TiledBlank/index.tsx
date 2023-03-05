import { useMemo } from "react";
import Tile from "../Tile";
import { TileGroup } from '../TileBoard.styles'
export type TiledBlankProps = {
  correctWordLength: number;
};

const TiledBlank: React.FC<TiledBlankProps> = ({ correctWordLength }) => {
  const tiledBlank = useMemo(() => {
    return " "
      .repeat(correctWordLength || 0)
      .split("")
      .map((blank: string, index: number) => {
        return (
          <Tile key={index} variant="default">
            {blank}
          </Tile>
        );
      });
  }, [correctWordLength]);

  return <TileGroup>{tiledBlank}</TileGroup>;
};

export default TiledBlank;
