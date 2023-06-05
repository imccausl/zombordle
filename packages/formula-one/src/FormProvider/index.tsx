import { useCallback, useMemo, useReducer, useRef } from 'react'

import FormContext, { type ContextProps } from './FormContext'
import formReducer, {
    resetState,
    setErrors,
    setFieldValue as setFieldValueAction,
    setIsFormValid,
    setValues,
} from './slice'

import type {
    FieldConfig,
    FieldRef,
    FormState,
    RegisterFieldFunction,
    SharedFormProviderProps,
    TrackedFieldConfig,
    UnRegisterFieldFunction,
} from '../types'

type TrackedFields = Map<string, TrackedFieldConfig>

const initialStateWithInitialValues = (
    initialValues: FormState['values'] = {},
): FormState => ({
    values: { ...initialValues },
    errors: {},
    touched: {},
    isFormValid: true,
})

export type FormProviderProps = SharedFormProviderProps & {
    initialValues: Record<string, string>
} & React.PropsWithChildren

export const FormProvider: React.FC<FormProviderProps> = ({
    children,
    validateOnBlur = true,
    validateOnChange,
    onSubmit,
    initialValues = {},
}) => {
    const [state, dispatch] = useReducer(formReducer, {
        ...initialStateWithInitialValues(initialValues),
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
        dispatch(resetState(initialValues))
    }, [initialValues])

    const doFieldValidation = useCallback(
        ({ fieldName, value }: { fieldName: string; value: string }) => {
            const validationMessage = trackedFields.current
                .get(fieldName)
                ?.validate?.(value)
            const isRequiredField = Boolean(
                trackedFields.current.get(fieldName)?.required,
            )
            const isRequiredInputFailed = isRequiredField && !value
            if (validationMessage || isRequiredInputFailed) {
                const requiredField =
                    trackedFields.current.get(fieldName)?.required
                const requiredFieldMessage =
                    typeof requiredField === 'string'
                        ? requiredField
                        : 'This field cannot be empty'
                dispatch(setIsFormValid(false))
                return {
                    fieldName,
                    errorMessage: validationMessage ?? requiredFieldMessage,
                }
            }
            dispatch(setIsFormValid(true))
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
                const previousErrorMessage = state.errors[e.target.name]
                const { errorMessage } = doFieldValidation({
                    fieldName: e.target.name,
                    value: e.target.value,
                })

                if (previousErrorMessage !== errorMessage) {
                    dispatch(
                        setErrors({
                            [e.target.name]: errorMessage,
                        }),
                    )
                }

                if (errorMessage) {
                    trackedFields.current.get(e.target.name)?.onInvalid?.(e)
                } else {
                    trackedFields.current.get(e.target.name)?.onValid?.(e)
                }
            }
        },
        [doFieldValidation, state.errors, validateOnBlur],
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

            setFieldValue(fieldName, initialValues[fieldName] ?? '')
        },
        [initialValues, setFieldValue],
    )

    const unRegisterField: UnRegisterFieldFunction = useCallback(
        (fieldName: string) => {
            trackedFields.current.delete(fieldName)
        },
        [],
    )

    const getFieldValues = useCallback(() => state.values, [state.values])

    const getFieldValue = useCallback(
        (name: string) => {
            return {
                value: state.values?.[name],
                onChange: handleOnChange,
                onBlur: handleOnBlur,
            }
        },
        [handleOnBlur, handleOnChange, state.values],
    )

    const getFieldRefs = useCallback(() => {
        const fieldRefs: Array<FieldRef> = []

        trackedFields.current.forEach(({ ref }) => {
            fieldRefs.push(ref)
        })

        return fieldRefs
    }, [])

    const setError = useCallback((name: string, message: string) => {
        setErrors({ [name]: message })
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
        /* this is kind of weird but we aren't able to
         * access the updated state immediately after dispatch
         * so we create a local version which we dispatch to
         * setErrors and use to figure out if the first validation error
         */
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
            dispatch(setIsFormValid(true))
            onSubmit(state.values)
        }

        // We have a validation error, so we have to handle moving
        // focus to the first invalid field.
        dispatch(setIsFormValid(false))
        handleInvalidFieldFocus(fieldName)
    }, [doFieldValidation, handleInvalidFieldFocus, onSubmit, state.values])

    const register = useCallback(
        (config: FieldConfig & Omit<TrackedFieldConfig, 'ref'>) => {
            const {
                validate,
                onInvalid,
                onValid,
                required,
                type,
                ...fieldProps
            } = config

            const refCallback = (ref: HTMLInputElement | null) => {
                if (ref) {
                    registerField(fieldProps.name, { current: ref }, validate, {
                        onInvalid,
                        onValid,
                        required,
                    })
                } else {
                    unRegisterField(fieldProps.name)
                }
            }

            return {
                ...fieldProps,
                onChange: handleOnChange,
                onBlur: handleOnBlur,
                required: !!required,
                type: type ?? 'text',
                ref: refCallback,
            }
        },
        [handleOnBlur, handleOnChange, registerField, unRegisterField],
    )

    const ctx = useMemo(
        () =>
            ({
                ...state,
                onChange: handleOnChange,
                onBlur: handleOnBlur,
                onSubmit: handleOnSubmit,
                register,
                registerField,
                unRegisterField,
                validateField: doFieldValidation,
                validateOnBlur,
                validateOnChange,
                setError,
                setFieldValue,
                getFieldState,
                getFieldValue,
                getFieldValues,
                getFieldRefs,
                getFieldRef,
                resetFormState,
            } satisfies ContextProps),
        [
            state,
            handleOnChange,
            handleOnBlur,
            handleOnSubmit,
            register,
            registerField,
            unRegisterField,
            doFieldValidation,
            validateOnBlur,
            validateOnChange,
            setError,
            setFieldValue,
            getFieldState,
            getFieldValue,
            getFieldValues,
            getFieldRefs,
            getFieldRef,
            resetFormState,
        ],
    )

    return <FormContext.Provider value={ctx}>{children}</FormContext.Provider>
}
