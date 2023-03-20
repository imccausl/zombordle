import { useCallback, useMemo, useReducer, useRef } from 'react'

import FormContext, { type ContextProps } from './FormContext'
import formReducer, {
    resetState,
    setErrors,
    setFieldValue as setFieldValueAction,
    setValues,
} from './slice'

import type {
    FormStateComponentProps,
    OnValidateErrorCallback,
    OnValidateSuccessCallback,
    RegisterFieldFunction,
    TrackedFieldConfig,
    UnRegisterFieldFunction,
} from './types'

type TrackedFields = Map<string, TrackedFieldConfig>

const initialState = {
    values: {},
    errors: {},
    touched: {},
}

export const FormState: React.FC<
    FormStateComponentProps & React.PropsWithChildren
> = ({ children, validateOnBlur, validateOnChange, onSubmit }) => {
    const [state, dispatch] = useReducer(formReducer, initialState)
    const trackedFields = useRef<TrackedFields>(new Map())

    const setFieldValue = useCallback((field: string, value: string) => {
        dispatch(
            setFieldValueAction({
                fieldName: field,
                value,
            }),
        )
    }, [])
    const getFieldState = useCallback(
        (name: string) => {
            return {
                value: state.values?.[name],
                error: state.errors?.[name],
                touched: state.touched?.[name],
            }
        },
        [state],
    )

    const resetFormState = useCallback(() => {
        dispatch(resetState())
    }, [])

    const doFieldValidation = useCallback(
        ({ fieldName, value }: { fieldName: string; value: string }) => {
            const validationMessage = trackedFields.current
                .get(fieldName)
                ?.validate?.(value)
            const requiredFieldValidationMessage =
                trackedFields.current.get(fieldName)?.required && !value
                    ? // TODO: Customize validation  or display validation message from valdiate function?
                      'This field cannot be empty'
                    : undefined

            if (validationMessage || requiredFieldValidationMessage) {
                return {
                    fieldName,
                    errorMessage:
                        validationMessage ?? requiredFieldValidationMessage,
                }
            }
            return { fieldName, errorMessage: undefined }
        },
        [],
    )

    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const shouldValidate =
                validateOnChange === true ||
                (validateOnChange === undefined && validateOnBlur === false)

            if (shouldValidate) {
                const { errorMessage } = doFieldValidation({
                    fieldName: e.target.name,
                    value: e.target.value,
                })

                dispatch(
                    setErrors({
                        [e.target.name]: errorMessage,
                    }),
                )

                if (errorMessage) {
                    trackedFields.current.get(e.target.name)?.onInvalid?.(e)
                } else {
                    trackedFields.current.get(e.target.name)?.onValid?.(e)
                }
            }

            dispatch(
                setValues({
                    [e.target.name]: e.target.value,
                }),
            )
        },
        [doFieldValidation, validateOnBlur, validateOnChange],
    )
    const handleOnBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            if (validateOnBlur) {
                const { errorMessage } = doFieldValidation({
                    fieldName: e.target.name,
                    value: e.target.value,
                })

                dispatch(
                    setErrors({
                        [e.target.name]: errorMessage,
                    }),
                )

                if (errorMessage) {
                    trackedFields.current.get(e.target.name)?.onInvalid?.(e)
                } else {
                    trackedFields.current.get(e.target.name)?.onValid?.(e)
                }
            }
        },
        [doFieldValidation, validateOnBlur],
    )

    const registerField: RegisterFieldFunction = useCallback(
        (fieldName, ref, validateFn, optionalConfig) => {
            if (trackedFields.current.has(fieldName)) {
                throw new Error(
                    `Field name ${fieldName} already exists. Name must be unique.`,
                )
            }

            if (!ref) throw new Error('Ref cannot be null')

            trackedFields.current.set(fieldName, {
                validate: validateFn,
                ref,
                ...optionalConfig,
            })
        },
        [],
    )

    const unRegisterField: UnRegisterFieldFunction = useCallback(
        (fieldName: string) => {
            trackedFields.current.delete(fieldName)
        },
        [],
    )

    const getFieldValues = useCallback(
        (name: string) => {
            return {
                value: state.values?.[name],
                onChange: handleOnChange,
                onBlur: handleOnBlur,
            }
        },
        [handleOnBlur, handleOnChange, state.values],
    )

    const getAllFieldRefs = useCallback(() => {
        const fieldRefs: Array<React.RefObject<HTMLInputElement>> = []

        trackedFields.current.forEach(({ ref }) => {
            fieldRefs.push(ref)
        })

        return fieldRefs
    }, [])

    const getFieldRef = useCallback(
        (name: string) => trackedFields.current.get(name)?.ref,
        [],
    )

    const handleInvalidFieldFocus = useCallback(
        (name: string | undefined) => {
            if (!name) return

            getFieldRef(name)?.current?.focus()
        },
        [getFieldRef],
    )

    const handleOnSubmit = useCallback(() => {
        const allErrors: Record<string, string | undefined> = {}

        for (const fieldName of trackedFields.current.keys()) {
            const { errorMessage } = doFieldValidation({
                fieldName,
                value: state.values[fieldName],
            })

            allErrors[fieldName] = errorMessage
        }

        dispatch(setErrors(allErrors))

        const [fieldName, firstValidationError] =
            Object.entries(allErrors).find(([_, error]) => !!error) ?? []

        if (!firstValidationError) {
            // submit the values if there's no first validation error,
            // form is valid.
            onSubmit(state.values)
        }

        // We have a validation error, so we have to handle moving
        // focus to the first invalid field. We should have enough
        // data from `firstValidationError` to do this. We might actually
        // only need the fieldName.

        handleInvalidFieldFocus(fieldName)
    }, [doFieldValidation, handleInvalidFieldFocus, onSubmit, state.values])

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
                getFieldState,
                getFieldValues,
                getAllFieldRefs,
                getFieldRef,
                resetFormState,
            } satisfies ContextProps),
        [
            getAllFieldRefs,
            getFieldRef,
            getFieldState,
            getFieldValues,
            handleOnBlur,
            handleOnChange,
            handleOnSubmit,
            registerField,
            resetFormState,
            setFieldValue,
            state,
            unRegisterField,
            validateOnBlur,
            validateOnChange,
        ],
    )

    return <FormContext.Provider value={ctx}>{children}</FormContext.Provider>
}
