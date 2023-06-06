import { useCallback } from 'react'

import { useFormContext } from './FormProvider/FormContext'

type FormProps = {
    onSubmit?: (arg: any) => void
    className?: string
}

export const useForm = () => {
    const { onSubmit, resetFormState } = useFormContext()
    const handleOnSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            onSubmit()
            //   resetFormState()
        },
        [onSubmit],
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
            noValidate // TODO: this should be an option (although probably the default?)
            {...props}
        >
            {children}
        </form>
    )
}
