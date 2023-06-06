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
    const { getFieldValues, setFieldValue, onSubmit } = useFormContext()
    const handleOnClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const fieldValues = getFieldValues()
            if (e.currentTarget.dataset.key === 'Backspace') {
                const lastFullFieldName = Object.keys(fieldValues).findLast(
                    (key) => fieldValues[key],
                )
                if (lastFullFieldName) {
                    setFieldValue(lastFullFieldName, '')
                }
            } else if (e.currentTarget.dataset.key === 'Enter') {
                onSubmit()
            } else {
                const firstEmptyFieldName = Object.keys(fieldValues).find(
                    (key) => !fieldValues[key],
                )
                if (firstEmptyFieldName) {
                    setFieldValue(
                        firstEmptyFieldName,
                        e.currentTarget.dataset.key ?? '',
                    )
                }
            }
        },
        [getFieldValues, setFieldValue],
    )

    const keyCodeValue = keyCode ? keyCode : children

    return (
        <LetterKeyContainer
            aria-label={label ?? undefined}
            $variant={variant}
            $flexGrow={label?.toLowerCase() === 'enter' ? '2' : '1'}
            data-key={typeof keyCodeValue === 'string' ? keyCodeValue : ''}
            onClick={handleOnClick}
        >
            {children}
        </LetterKeyContainer>
    )
}
