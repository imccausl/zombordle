import { useCallback, useRef } from 'react'

import { useFormContext } from '../FormContext'

type FormProps = {
    onSubmit?: (arg: any) => void
    className?: string
}
export const Form: React.FC<FormProps & React.PropsWithChildren> = ({
    className,
    children,
    ...props
}) => {
    const { values, errors, onSubmit, resetFormState } = useFormContext()
    const formRef = useRef<HTMLFormElement>(null)
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

    return (
        <form
            ref={formRef}
            className={className}
            onSubmit={handleOnSubmit}
            onReset={handleOnReset}
            noValidate
            {...props}
        >
            {children}
        </form>
    )
}
