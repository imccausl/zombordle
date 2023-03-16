import { useCallback, useRef } from 'react'

import { useFormContext } from './FormContext'

type FormProps = {
    onSubmit?: (arg: any) => void
    className?: string
}
export const Form: React.FC<FormProps & React.PropsWithChildren> = ({
    onSubmit,
    className,
    children,
    ...props
}) => {
    const {
        values,
        errors,
        onSubmit: contextOnSubmit,
        resetFormState,
    } = useFormContext()
    const formRef = useRef<HTMLFormElement>(null)
    const handleOnSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const submitFn = onSubmit ?? contextOnSubmit
            submitFn({ values, errors, formEvent: e })
            resetFormState()
        },
        [contextOnSubmit, errors, onSubmit, resetFormState, values],
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
