export type ValidateFn = (value: string) => boolean | undefined

export type OnValidateSuccessCallback = (
    e: React.FocusEvent<HTMLInputElement>,
) => void
export type OnValidateErrorCallback = (
    e: React.FocusEvent<HTMLInputElement>,
) => void

export type FormStateComponentProps = {
    validateOnChange?: boolean
    validateOnBlur?: boolean
    onSubmit: (arg: any) => void
}

export type FormState = {
    errors: Record<string, string | undefined>
    values: Record<string, string>
    touched: Record<string, boolean>
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
    resetFormState: () => void
}

type TrackedFieldCallbacks = {
    validate: ValidateFn
    onSuccess?: OnValidateSuccessCallback
    onError?: OnValidateErrorCallback
}

export type TrackedFieldConfig = TrackedFieldCallbacks &
    Partial<{
        required: boolean
    }>

export type TrackedFieldOptionalConfig = Omit<TrackedFieldConfig, 'validate'>

export type FormFunctions = {
    registerField: (
        fieldName: string,
        validateFn: ValidateFn,
        optionalConfig?: TrackedFieldOptionalConfig,
    ) => void
    unRegisterField: (fieldName: string) => void
}
