export type ValidateFn = (value: string) => boolean | undefined

export type OnValidateSuccessCallback = (
    e: React.FocusEvent<HTMLInputElement>,
) => void
export type OnValidateErrorCallback = (
    e: React.FocusEvent<HTMLInputElement>,
) => void
