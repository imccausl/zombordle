import { type TrackedFieldCallbacks, type ValidateFn } from './callbacks'
import {
    type FieldConfig,
    type FieldProps,
    type FieldRef,
    type OnBlurFn,
    type OnChangeFn,
} from './field'

export type FormState = {
    errors: Record<string, string | undefined>
    values: Record<string, string>
    touched: Record<string, boolean>
    isFormValid: boolean
}

export type SharedFormProviderProps = {
    validateOnChange?: boolean
    validateOnBlur?: boolean
    onSubmit: (arg: any) => void
}

type FormFieldValues = {
    value: string
    onChange: OnChangeFn
    onBlur: OnBlurFn
}

export type FormStateActions = {
    onChange: OnChangeFn
    onBlur: OnBlurFn
    onSubmit: () => void
    setError: (name: string, message: string) => void
    setFieldValue: (field: string, value: string) => void
    resetFieldError: (field: string) => void
    getFieldState: (name: string) => {
        error: FormState['errors'][string]
        value: FormState['values'][string]
        touched: FormState['touched'][string]
    }
    getFieldValue: (name: string) => FormFieldValues
    getFieldValues: () => FormState['values']
    getFieldRefs: () => Array<FieldRef>
    getFieldRef: (name: string) => FieldRef | undefined
    resetFormState: () => void
    validateField: ({
        fieldName,
        value,
    }: {
        fieldName: string
        value: string
    }) => { fieldName: string; errorMessage: string | undefined }
    register: (
        config: FieldConfig & Omit<TrackedFieldConfig, 'ref'>,
    ) => FieldConfig &
        FormFieldValues &
        Omit<FieldProps, 'ref'> & {
            ref: (ref: HTMLInputElement | null) => void
        }
}

export type TrackedFieldConfig = TrackedFieldCallbacks & {
    ref: FieldRef
    required?: string | boolean
}

export type TrackedFieldOptionalConfig = Omit<
    TrackedFieldConfig,
    'validate' | 'ref'
>

export type RegisterFieldFunction = (
    fieldName: string,
    ref: FieldRef,
    validateFn?: ValidateFn,
    optionalConfig?: TrackedFieldOptionalConfig,
) => void

export type UnRegisterFieldFunction = (fieldName: string) => void

export type FormFunctions = {
    registerField: RegisterFieldFunction
    unRegisterField: UnRegisterFieldFunction
}
