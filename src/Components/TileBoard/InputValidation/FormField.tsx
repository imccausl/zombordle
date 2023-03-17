import {
    Children,
    cloneElement,
    isValidElement,
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
    onSuccess?: OnValidateSuccessCallback
    onError?: OnValidateErrorCallback
    name?: string
    children: React.ReactNode
    /**
     * Indicates whether the input field is required or not. Same as `<input required ...>`.
     * Although false by default, `required` may also be specified in your field validation.
     */
    required?: boolean
}

export const FormField: React.FC<FormFieldProps> = ({
    name,
    validate,
    onSuccess,
    onError,
    children,
    required = false,
}) => {
    const { registerField, unRegisterField, getFieldState, onChange, onBlur } =
        useFormContext()
    const { name: fieldName, onChange: childOnChange } = useMemo(() => {
        if (Children.count(children) > 1) {
            throw new Error('FormField cannot have more than one child.')
        }

        return isValidElement(children) ? children.props : {}
    }, [children])

    useEffect(() => {
        registerField(fieldName ?? name, validate, {
            onSuccess,
            onError,
            required,
        })

        return () => {
            unRegisterField(fieldName ?? name)
        }
    }, [
        fieldName,
        name,
        onError,
        onSuccess,
        registerField,
        required,
        unRegisterField,
        validate,
    ])

    return isValidElement(children)
        ? cloneElement(children, {
              ...children.props,
              value: getFieldState(fieldName).value,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(e)
                  childOnChange(e)
              },
              onBlur,
          })
        : null
}
