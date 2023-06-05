import { KeyboardRows } from './Keyboard.constants'
import { KeyboardContainer, RowContainer } from './Keyboard.styles'
import { LetterKey } from './LetterKey'

export const Keyboard: React.FC = () => {
    return (
        <KeyboardContainer>
            {KeyboardRows.reduce<JSX.Element[]>((allRows, row) => {
                return allRows.concat(
                    <RowContainer key={row.join('')}>
                        {row.map((letter) => (
                            <LetterKey key={letter} letter={letter} />
                        ))}
                    </RowContainer>,
                )
            }, [])}
        </KeyboardContainer>
    )
}
