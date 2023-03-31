type ElementEventHandler<EventType> = (event: EventType) => void

export type OnChangeFn = ElementEventHandler<
    React.ChangeEvent<HTMLInputElement>
>
export type OnBlurFn = ElementEventHandler<React.FocusEvent<HTMLInputElement>>
export type FieldRef = React.RefObject<HTMLInputElement>

export type FieldProps = {
    onChange: OnChangeFn
    onBlur: OnBlurFn
    name: string
    required: boolean
    ref: FieldRef
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
