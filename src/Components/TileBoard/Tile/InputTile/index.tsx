import { TileStyledTextInput } from "./InputTile.styles";

type InputTileProps = {
  name: string
  label?: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputTile: React.FC<InputTileProps> = ({ name, label, onChange, value }) => {
  return <TileStyledTextInput name={name} value={value} aria-label={label} onChange={onChange} />;
};

export default InputTile
