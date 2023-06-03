import { FormProvider, type FormState as FormStateType } from 'formula-one'
import { useCallback, useMemo } from 'react'

import { TiledInputForm } from './TiledInputForm'

export type TiledInputProps = {
    guessNumber: number
    length: number
    onSubmit: (value: string) => void
}

const TiledInput: React.FC<TiledInputProps> = ({
    length,
    guessNumber,
    onSubmit,
}) => {
    const initialValues = useMemo(
        () =>
            new Array(length).fill('').reduce((acc, _, index: number) => {
                acc[`input-${index + 1}`] = ''
                return acc
            }, {}),
        [length],
    )
    const handleOnSubmit = useCallback(
        (values: FormStateType['values']) => {
            const wordSubmission = Object.values(values).reduce(
                (word, letter) => word.concat(letter),
                '',
            )
            onSubmit(wordSubmission)
        },
        [onSubmit],
    )

    return (
        <FormProvider
            validateOnBlur={true}
            onSubmit={handleOnSubmit}
            initialValues={initialValues}
        >
            <TiledInputForm length={length} guessNumber={guessNumber} />
        </FormProvider>
    )
}

export default TiledInput
