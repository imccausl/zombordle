import { useMemo, useCallback } from "react";
import InputTile from "../Tile/InputTile";
import { TileInputGroup, InputTileContainer } from './TiledInput.styles'

export type TiledInputProps = {
  length: number;
  value: string;
  onChange: (value: string) => void
};

const isInputElement = (element: ChildNode | null | undefined): element is HTMLInputElement => Boolean(element && 'focus' in element)

const TiledInput: React.FC<TiledInputProps> = ({
  value,
  length,
  onChange,
}) => {
  const valueWithCorrectLength = useMemo(() => value.concat(" ".repeat(length - (value.length || 0))), [length, value])
  const handleCreateNewValue = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const targetValue = e.target.value
    const newValue = valueWithCorrectLength.substring(0, index).concat(targetValue).concat(valueWithCorrectLength.substring(index + 1));
    const nextElement = index < valueWithCorrectLength.length ? e.target.parentElement?.parentElement?.children[index+1]?.firstChild : null

    onChange(newValue)

    if (isInputElement(nextElement)) {
      nextElement.focus()
    }
  }, [onChange, valueWithCorrectLength])
  const tiledBlank = useMemo(() => {
    return valueWithCorrectLength.split("")
      .map((letter: string, index: number) => {
        return (
          <InputTileContainer key={`input-${index+1}`}>
            <InputTile name={`input-${index+1}`} value={letter === " " ? "" : letter} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleCreateNewValue(e, index)}  /> 
          </InputTileContainer>
        );
      });
  }, [valueWithCorrectLength, handleCreateNewValue]);

  return <TileInputGroup role="list">{tiledBlank}</TileInputGroup>;
};

export default TiledInput;
