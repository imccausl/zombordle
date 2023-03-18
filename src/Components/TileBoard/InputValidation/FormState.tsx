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
    TrackedFieldConfig,
    TrackedFieldOptionalConfig,
    ValidateFn,
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

    const doFieldValiation = useCallback(
        ({
            shouldValidate,
            fieldName,
            value,
            onValid,
            onInvalid,
        }: {
            shouldValidate: boolean
            fieldName: string
            value: string
            onValid?: () => OnValidateSuccessCallback | void
            onInvalid?: () => OnValidateErrorCallback | void
        }) => {
            if (shouldValidate) {
                const validationMessage = trackedFields.current
                    .get(fieldName)
                    ?.validate(value)

                if (validationMessage) {
                    dispatch(
                        setErrors({
                            [fieldName]: validationMessage,
                        }),
                    )
                    onInvalid?.()
                } else {
                    dispatch(setErrors({ [fieldName]: undefined }))
                    onValid?.()
                }
            }
        },
        [],
    )

    const doAllValidations = useCallback(() => {
        /* perform all validations */
        for (const fieldName in trackedFields.current.keys()) {
            doFieldValiation({
                shouldValidate: true,
                fieldName,
                value: state.values[fieldName],
            })
        }

        /* check for errors */

        /* check for required */

        /* move focus if input is invalid */
    }, [doFieldValiation, state.values])

    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const shouldValidate =
                validateOnChange === true ||
                (validateOnChange === undefined && validateOnBlur === false)

            doFieldValiation({
                shouldValidate,
                fieldName: e.target.name,
                value: e.target.value,
                onInvalid: () =>
                    trackedFields.current
                        .get(e.target.name)
                        ?.onInvalid?.(e as any),
                onValid: () =>
                    trackedFields.current
                        .get(e.target.name)
                        ?.onValid?.(e as any),
            })

            dispatch(
                setValues({
                    [e.target.name]: e.target.value,
                }),
            )
        },
        [doFieldValiation, validateOnBlur, validateOnChange],
    )
    const handleOnBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            doFieldValiation({
                shouldValidate: !!validateOnBlur,
                fieldName: e.target.name,
                value: e.target.value,
                onInvalid: () =>
                    trackedFields.current
                        .get(e.target.name)
                        ?.onInvalid?.(e as any),
                onValid: () =>
                    trackedFields.current
                        .get(e.target.name)
                        ?.onValid?.(e as any),
            })
        },
        [doFieldValiation, validateOnBlur],
    )
    const handleOnSubmit = useCallback(() => {
        // this runs the validation logic, but realistically it should probably check if
        // there are any errors, since validation should run either on submit or onblur.
        // one outstanding question, though, in this case. If onblur validation, will the last
        // input not get validated if the user presses enter?
        const isValid = Object.values(state.errors).some((error) => {
            console.log(error)
            return Boolean(error)
        })

        console.log(
            Object.keys(state.values).length,
            trackedFields.current.size,
        )

        // TODO: submit requirements are: are all required fields filled in and does the form match the validation criteria?

        if (
            Object.keys(state.values).length === trackedFields.current.size &&
            isValid
        ) {
            onSubmit(state)
            return
        }
    }, [onSubmit, state])

    const registerField = useCallback(
        (
            fieldName: string,
            validateFn: ValidateFn,
            optionalConfig?: TrackedFieldOptionalConfig,
        ) => {
            if (trackedFields.current.has(fieldName)) {
                throw new Error(
                    `Field name ${fieldName} already exists. Name must be unique.`,
                )
            }

            trackedFields.current.set(fieldName, {
                validate: validateFn,
                ...optionalConfig,
            })
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
                getFieldState,
                getFieldValues,
                resetFormState,
            } satisfies ContextProps),
        [
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
