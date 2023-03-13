import { createContext, useContext } from 'react'

import type {
    OnValidateErrorCallback,
    OnValidateSuccessCallback,
    ValidateFn,
} from './types'

export type FormStateComponentProps = {
    validateOnChange?: boolean
    validateOnBlur?: boolean
    onSubmit: (arg: any) => void
}

export type FormProps = {
    errors: Record<string, string | undefined>
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
            onSuccess: OnValidateSuccessCallback
            onError: OnValidateErrorCallback
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
