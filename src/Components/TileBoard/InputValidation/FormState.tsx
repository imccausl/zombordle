import { useCallback, useMemo, useReducer, useRef } from 'react'

import FormContext, {
    type ContextProps,
    type FormStateComponentProps,
} from './FormContext'
import formReducer, {
    setErrors,
    setFieldValue as setFieldValueAction,
    setValues,
} from './slice'

import type {
    OnValidateErrorCallback,
    OnValidateSuccessCallback,
    ValidateFn,
} from './types'

type TrackedFieldCallbacks = {
    validate: ValidateFn
    onSuccess?: OnValidateSuccessCallback
    onError?: OnValidateErrorCallback
}
type TrackedFields = Map<string, TrackedFieldCallbacks>

export const FormState: React.FC<
    FormStateComponentProps & React.PropsWithChildren
> = ({ children, validateOnBlur, validateOnChange, onSubmit }) => {
    const [state, dispatch] = useReducer(formReducer, {
        values: {},
        errors: {},
        touched: {},
    })
    const trackedFields = useRef<TrackedFields>(new Map())
    const setFieldValue = useCallback((field: string, value: string) => {
        dispatch(
            setFieldValueAction({
                fieldName: field,
                value,
            }),
        )
    }, [])

    const isInputValid = useCallback(
        (field: string, value: string) =>
            !trackedFields.current.get(field)?.validate(value),
        [],
    )
    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (
                validateOnChange === true ||
                (validateOnChange === undefined && validateOnBlur === false)
            ) {
                if (!isInputValid(e.target.name, e.target.value)) {
                    dispatch(
                        setErrors({
                            [e.target.name]: 'Validation error goes here',
                        }),
                    )
                    trackedFields.current.get(e.target.name)?.onError?.(e)
                } else {
                    dispatch(setErrors({ [e.target.value]: undefined }))
                }
            }

            dispatch(
                setValues({
                    [e.target.name]: e.target.value,
                }),
            )
        },
        [isInputValid, validateOnBlur, validateOnChange],
    )
    const handleOnBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            if (validateOnBlur) {
                if (isInputValid(e.target.name, e.target.value)) {
                    dispatch(
                        setErrors({
                            [e.target.name]: 'Invalid hint goes here',
                        }),
                    )
                    trackedFields.current.get(e.target.name)?.onError?.(e)
                } else {
                    dispatch(
                        setErrors({
                            [e.target.name]: undefined,
                        }),
                    )
                }
            }
        },
        [isInputValid, validateOnBlur],
    )

    const handleOnSubmit = useCallback(() => {
        onSubmit(state)
    }, [onSubmit, state])

    const registerField = useCallback(
        (
            fieldName: string,
            validateFn: ValidateFn,
            optionalCallbacks?: Omit<TrackedFieldCallbacks, 'validate'>,
        ) => {
            trackedFields.current.set(fieldName, {
                validate: validateFn,
                ...optionalCallbacks,
            })
        },
        [],
    )

    const unRegisterField = useCallback((fieldName: string) => {
        trackedFields.current.delete(fieldName)
    }, [])

    const ctx = useMemo(
        () =>
            ({
                ...state,
                onChange: handleOnChange,
                onBlur: handleOnBlur,
                onSubmit: handleOnSubmit,
                registerField,
                unRegisterField,
                validateOnBlur,
                validateOnChange,
                setFieldValue,
            } satisfies ContextProps),
        [
            handleOnBlur,
            handleOnChange,
            handleOnSubmit,
            registerField,
            setFieldValue,
            state,
            unRegisterField,
            validateOnBlur,
            validateOnChange,
        ],
    )

    return <FormContext.Provider value={ctx}>{children}</FormContext.Provider>
}
