import { useCallback, useMemo } from 'react'
import { FormProvider } from 'zombordle/packages/formula-one/InputValidation/FormProvider'

import { TiledInputForm } from './TiledInputForm'

import type { FormState as FormStateType } from 'zombordle/packages/formula-one/InputValidation/types'

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
