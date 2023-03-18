import {
    Children,
    cloneElement,
    createElement,
    isValidElement,
    useCallback,
    useEffect,
    useMemo,
} from 'react'

import { useFormContext } from './FormContext'

import type {
    OnValidateErrorCallback,
    OnValidateSuccessCallback,
    ValidateFn,
} from './types'

export type FormFieldProps = {
    validate: ValidateFn
    onValid?: OnValidateSuccessCallback
    onInvalid?: OnValidateErrorCallback
    name: string
    children: React.ReactNode | ((props: any) => React.ReactNode)
    /**
     * Indicates whether the input field is required or not. Same as `<input required ...>`.
     * Although false by default, `required` may also be specified in your field validation.
     */
    required?: boolean
}

export type UseFieldProps = {
    validate: ValidateFn
    onValid?: OnValidateSuccessCallback
    onInvalid?: OnValidateErrorCallback
    name: string
    required: boolean
}

export type FieldProps = {
    setFieldValue: (value: string) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    name: string
    required: boolean
    value: string
    meta: {
        error: string | undefined
        touched: boolean
    }
}

export const useField = ({
    name,
    required,
    validate,
    onInvalid,
    onValid,
}: UseFieldProps): FieldProps => {
    const {
        registerField,
        unRegisterField,
        getFieldState,
        setFieldValue: setFormContextFieldValue,
        onChange,
        onBlur,
    } = useFormContext()

    /* validate, onValid, and onInvalid need to be registered with
     * the form context
     */
    useEffect(() => {
        registerField(name, validate, {
            onValid,
            onInvalid,
            required,
        })

        return () => {
            unRegisterField(name)
        }
    }, [
        name,
        onInvalid,
        onValid,
        registerField,
        required,
        unRegisterField,
        validate,
    ])

    const { value, meta } = useMemo(() => {
        const { value, ...rest } = getFieldState(name)

        return {
            value,
            meta: { ...rest },
        }
    }, [getFieldState, name])

    const setFieldValue = useCallback(
        (value: string) => {
            setFormContextFieldValue(name, value)
        },
        [name, setFormContextFieldValue],
    )

    return {
        name,
        onChange,
        onBlur,
        setFieldValue,
        required,
        value,
        meta,
    }
}

export const Field: React.FC<FormFieldProps> = ({
    name,
    validate,
    onValid,
    onInvalid,
    children,
    required = false,
}) => {
    const fieldProps = useField({
        name,
        validate,
        onValid,
        onInvalid,
        required,
    })

    // const { name: fieldName, onChange: childOnChange } = useMemo(() => {
    //     if (Children.count(children) > 1) {
    //         throw new Error('FormField cannot have more than one child.')
    //     }

    //     return isValidElement(children) ? children.props : {}
    // }, [children])

    if (typeof children === 'function') {
        children({ ...fieldProps })
    }

    return isValidElement(children)
        ? cloneElement(children, {
              ...children.props,

              onBlur,
          })
        : null
}
