import { useFormContext } from 'formula-one'
import { useCallback } from 'react'

import { LetterKeyContainer, type VariantColor } from './LetterKey.styles'

type LetterKeyProps = {
    letter: string
    variant: VariantColor
}

export const LetterKey: React.FC<LetterKeyProps> = ({ letter, variant }) => {
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
        <LetterKeyContainer
            $variant={variant}
            data-key={letter}
            onClick={handleOnClick}
        >
            {letter}
        </LetterKeyContainer>
    )
}
