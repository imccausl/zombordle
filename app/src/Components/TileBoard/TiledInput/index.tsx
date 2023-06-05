import { FormProvider, type FormState as FormStateType } from 'formula-one'
import { useCallback, useMemo } from 'react'

import { TiledInputForm } from './TiledInputForm'

export type TiledInputProps = {
    guessNumber: number
    wordList: string[]
    length: number
    onSubmit: (value: string) => void
}

const TiledInput: React.FC<TiledInputProps> = ({
    length,
    wordList,
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

            if (!wordList.includes(wordSubmission)) {
                // temporary
                alert(`${wordSubmission} not in word list`)
                // need to move focus to the first letter
                // and show an error/hint
                return
            }

            onSubmit(wordSubmission)
        },
        [onSubmit, wordList],
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
