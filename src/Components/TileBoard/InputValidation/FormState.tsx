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
    const isInputValid = useCallback(
        (field: string, value: string) =>
            trackedFields.current.get(field)?.validate(value),
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
                if (!isInputValid(e.target.name, e.target.value)) {
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
        // this runs the validation logic, but realistically it should probably check if
        // there are any errors, since validation should run either on submit or onblur.
        // one outstanding question, though, in this case. If onblur validation, will the last
        // input not get validated if the user presses enter?
        const isValid = Object.entries(state.values).every(([name, value]) => {
            console.log(name, value)
            return isInputValid(name, value)
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
    }, [isInputValid, onSubmit, state])

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
                resetFormState,
            } satisfies ContextProps),
        [
            getFieldState,
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
