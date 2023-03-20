export type FieldProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    name: string
    required: boolean
    value: string
    ref: React.RefObject<HTMLInputElement>
}

export type MetaProps = {
    error: string | undefined
    touched: boolean
    setFieldValue: (value: string) => void
}
