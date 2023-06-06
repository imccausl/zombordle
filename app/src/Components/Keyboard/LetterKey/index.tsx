import { useFormContext } from 'formula-one'
import { useCallback } from 'react'

import { LetterKeyContainer, type VariantColor } from './LetterKey.styles'

type LetterKeyProps = React.PropsWithChildren<{
    label?: string
    variant: VariantColor
    keyCode?: string
}>

export const LetterKey: React.FC<LetterKeyProps> = ({
    children,
    label,
    variant,
    keyCode = undefined,
}) => {
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
            aria-label={label ?? undefined}
            $variant={variant}
            data-key={keyCode ?? typeof children === 'string' ? children : ''}
            onClick={handleOnClick}
        >
            {children}
        </LetterKeyContainer>
    )
}
