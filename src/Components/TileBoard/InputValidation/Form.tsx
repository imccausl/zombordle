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
}) => {
    const { values, errors, onSubmit: contextOnSubmit } = useFormContext()
    const formRef = useRef<HTMLFormElement>(null)
    const handleOnSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            console.log('submit', e)
            e.preventDefault()
            const submitFn = onSubmit ?? contextOnSubmit
            submitFn({ values, errors, formEvent: e })
        },
        [contextOnSubmit, errors, onSubmit, values],
    )

    return (
        <form ref={formRef} className={className} onSubmit={handleOnSubmit}>
            {children}
        </form>
    )
}
