import { createContext, useContext } from 'react'

export type ValidateFn = (value: string) => boolean | undefined
export type OnValidateSuccess = <T extends HTMLElement>(
    e: React.FocusEvent<T>,
) => void
export type OnValidateError = <T extends HTMLElement>(
    e: React.FocusEvent<T>,
) => void

export type FormStateComponentProps = {
    validateOnChange?: boolean
    validateOnBlur?: boolean
}

export type FormProps = {
    errors: Record<string, string>
    values: Record<string, string>
    touched: Record<string, boolean>
}

type FormStateActions = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    setFieldValue: (field: string, value: string) => void
}

type FormFunctions = {
    registerField: (
        fieldName: string,
        validateFn: ValidateFn,
        optionalCallbacks?: Partial<{
            onSuccess: OnValidateSuccess
            onError: OnValidateError
        }>,
    ) => void
    unRegisterField: (fieldName: string) => void
}

export type ContextProps = FormProps &
    FormStateActions &
    FormFunctions &
    FormStateComponentProps

const FormContext = createContext<ContextProps | null>(null)
FormContext.displayName = 'FormContext'

export const useFormContext = () => {
    const form = useContext(FormContext)

    if (!form) {
        throw new Error(
            'useFormContext can only be used in elements that are children of a FormProvider',
        )
    }

    return form
}

export default FormContext
