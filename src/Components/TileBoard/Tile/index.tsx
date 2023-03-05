import { TileContainer, VariantColor } from "./Tile.styles";

type ReactProps = {
  children?: string;
};

export type TileProps = {
  variant?: keyof typeof VariantColor;
};

type Props = ReactProps & TileProps;

const Tile: React.FC<Props> = ({ children = null, variant = "default" }) => {
  return <TileContainer variant={variant}>{children}</TileContainer>;
};

export default Tile;
