import { FIRST_ROW, SECOND_ROW, THIRD_ROW } from './Keyboard.constants'
import { KeyboardContainer, RowContainer } from './Keyboard.styles'
import { LetterKey } from './LetterKey'

export const Keyboard: React.FC = () => {
    return (
        <KeyboardContainer>
            <RowContainer>
                {FIRST_ROW.map((letter) => (
                    <LetterKey key={letter} letter={letter} />
                ))}
            </RowContainer>
            <RowContainer>
                {SECOND_ROW.map((letter) => (
                    <LetterKey key={letter} letter={letter} />
                ))}
            </RowContainer>
            <RowContainer>
                {THIRD_ROW.map((letter) => (
                    <LetterKey key={letter} letter={letter} />
                ))}
            </RowContainer>
        </KeyboardContainer>
    )
}
