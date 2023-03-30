export type FieldProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    name: string
    required: boolean
    ref: React.RefObject<HTMLInputElement>
}

export type MetaProps = {
    error: string | undefined
    touched: boolean
    setFieldValue: (value: string) => void
}

export type FieldConfig = {
    type?: string
    name: string
    defaultValue?: string
    maxLength?: number
    minLength?: number
    pattern?: string
    autofocus?: boolean
}
