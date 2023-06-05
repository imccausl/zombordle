import { useFormContext } from 'formula-one'
import { useCallback } from 'react'

import { LetterKeyContainer } from './LetterKey.styles'

type LetterKeyProps = {
    letter: string
}

export const LetterKey: React.FC<LetterKeyProps> = ({ letter }) => {
    const { getFieldValues, setFieldValue } = useFormContext()
    const handleOnClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const fieldValues = getFieldValues()
            const firstEmptyFieldName = Object.keys(fieldValues).find(
                (key) => !fieldValues[key],
            )
            if (firstEmptyFieldName) {
                setFieldValue(
                    firstEmptyFieldName,
                    e.currentTarget.dataset.key ?? '',
                )
            }
        },
        [getFieldValues, setFieldValue],
    )

    return (
        <LetterKeyContainer data-key={letter} onClick={handleOnClick}>
            {letter}
        </LetterKeyContainer>
    )
}
