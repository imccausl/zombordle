import { TiledInputForm } from './TiledInputForm'

export type TiledInputProps = {
    guessNumber: number
    length: number
}

const TiledInput: React.FC<TiledInputProps> = ({ length, guessNumber }) => {
    return <TiledInputForm length={length} guessNumber={guessNumber} />
}

export default TiledInput
