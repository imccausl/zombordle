import {
    cloneElement,
    isValidElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react'

import { useFormContext } from '../FormContext'

import type {
    OnValidateErrorCallback,
    OnValidateSuccessCallback,
    ValidateFn,
} from '../types'

export type FormFieldProps = {
    validate?: ValidateFn
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

export type UseFieldProps = Omit<FormFieldProps, 'children'>

export const useField = ({
    name,
    required = false,
    validate,
    onInvalid,
    onValid,
}: UseFieldProps) => {
    const {
        registerField,
        unRegisterField,
        getFieldState,
        setFieldValue: setFormContextFieldValue,
        onChange,
        onBlur,
    } = useFormContext()

    const fieldRef = useRef<HTMLInputElement>(null)
    /* validate, onValid, and onInvalid need to be registered with
     * the form context
     */
    useEffect(() => {
        registerField(name, fieldRef, validate, {
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

    const setFieldValue = useCallback(
        (value: string) => {
            setFormContextFieldValue(name, value)
        },
        [name, setFormContextFieldValue],
    )

    const { value, meta } = useMemo(() => {
        const { value, ...rest } = getFieldState(name)

        return {
            value,
            meta: { ...rest, setFieldValue },
        }
    }, [getFieldState, name, setFieldValue])

    const fieldElementProps = useMemo(
        () => ({
            name,
            value,
            onBlur,
            onChange,
            ref: fieldRef,
            required,
            'aria-required': required,
            'aria-invalid': !!meta.error,
        }),
        [meta.error, name, onBlur, onChange, required, value],
    )

    return {
        meta,
        field: { ...fieldElementProps },
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
    const { meta, field } = useField({
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
        children({ meta, field })
    }

    return isValidElement(children)
        ? cloneElement(children, {
              ...children.props, // this will override required and name without them being registered
              ...field,
          })
        : null
}
