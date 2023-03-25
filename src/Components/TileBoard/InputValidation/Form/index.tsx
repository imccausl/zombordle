import { useCallback } from 'react'

import { useFormContext } from '../FormContext'

type FormProps = {
    onSubmit?: (arg: any) => void
    className?: string
}

export const useForm = () => {
    const { values, errors, onSubmit, resetFormState } = useFormContext()
    const handleOnSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            onSubmit({ values, errors, formEvent: e })
            //   resetFormState()
        },
        [errors, onSubmit, values],
    )
    const handleOnReset = useCallback(() => {
        resetFormState()
    }, [resetFormState])

    return {
        onFormReset: handleOnReset,
        onFormSubmit: handleOnSubmit,
    }
}

export const Form: React.FC<FormProps & React.PropsWithChildren> = ({
    className,
    children,
    ...props
}) => {
    const { onFormReset, onFormSubmit } = useForm()

    return (
        <form
            className={className}
            onSubmit={onFormSubmit}
            onReset={onFormReset}
            noValidate
            {...props}
        >
            {children}
        </form>
    )
}
