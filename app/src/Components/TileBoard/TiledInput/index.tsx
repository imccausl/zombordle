import { FormProvider, type FormState as FormStateType } from 'formula-one'
import { useCallback, useMemo } from 'react'

import { TiledInputForm } from './TiledInputForm'

export type TiledInputProps = {
    length: number
    onSubmit: (value: string) => void
}

const TiledInput: React.FC<TiledInputProps> = ({ length, onSubmit }) => {
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
            <TiledInputForm length={length} />
        </FormProvider>
    )
}

export default TiledInput