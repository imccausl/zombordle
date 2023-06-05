import { LetterKeyContainer } from './LetterKey.styles'

type LetterKeyProps = {
    letter: string
}

export const LetterKey: React.FC<LetterKeyProps> = ({ letter }) => {
    return <LetterKeyContainer>{letter}</LetterKeyContainer>
}
