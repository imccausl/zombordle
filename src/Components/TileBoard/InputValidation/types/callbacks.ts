import type React from 'react'

export type ValidateFn = (value: string) => string | undefined

export type OnValidateSuccessCallback = (
    e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>,
) => void
export type OnValidateErrorCallback = (
    e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>,
) => void

export type TrackedFieldCallbacks = {
    validate?: ValidateFn
    onValid?: OnValidateSuccessCallback
    onInvalid?: OnValidateErrorCallback
}
