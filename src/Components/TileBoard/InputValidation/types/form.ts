import { type TrackedFieldCallbacks, type ValidateFn } from './callbacks'
import { type FieldConfig, type FieldProps } from './field'

import type React from 'react'

type FormEventHandler<EventType> = (event: EventType) => void

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
    onChange: FormEventHandler<React.ChangeEvent<HTMLInputElement>>
    onBlur: FormEventHandler<React.FocusEvent<HTMLInputElement>>
}

export type FormStateActions = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    setFieldValue: (field: string, value: string) => void
    getFieldState: (name: string) => {
        error: FormState['errors'][string]
        value: FormState['values'][string]
        touched: FormState['touched'][string]
    }
    getFieldValues: (name: string) => FormFieldValues
    getFieldRefs: () => Array<React.RefObject<HTMLInputElement>>
    getFieldRef: (name: string) => React.RefObject<HTMLInputElement> | undefined
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
        Omit<FieldProps, 'ref'> & {
            ref: (ref: HTMLInputElement | null) => void
        }
}

export type TrackedFieldConfig = TrackedFieldCallbacks & {
    ref: React.RefObject<HTMLInputElement>
    required?: string | boolean
}

export type TrackedFieldOptionalConfig = Omit<
    TrackedFieldConfig,
    'validate' | 'ref'
>

export type RegisterFieldFunction = (
    fieldName: string,
    ref: React.RefObject<HTMLInputElement>,
    validateFn?: ValidateFn,
    optionalConfig?: TrackedFieldOptionalConfig,
) => void

export type UnRegisterFieldFunction = (fieldName: string) => void

export type FormFunctions = {
    registerField: RegisterFieldFunction
    unRegisterField: UnRegisterFieldFunction
}
