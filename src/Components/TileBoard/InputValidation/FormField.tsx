import {
    Children,
    cloneElement,
    isValidElement,
    useCallback,
    useEffect,
    useMemo,
} from 'react'

import { useFormContext } from './FormContext'

export type FormFieldProps = {
    validate: (value: string) => boolean | undefined
    onSuccess?: <T extends HTMLElement>(e: React.FocusEvent<T>) => void
    onError?: <T extends HTMLElement>(e: React.FocusEvent<T>) => void
    name?: string
    children: React.ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({
    name,
    validate,
    onSuccess,
    onError,
    children,
}) => {
    const { registerField, unRegisterField, values, onChange, onBlur } =
        useFormContext()
    const {
        name: fieldName,
        onChange: childOnChange,
        onKeyDown: childOnKeyDown,
    } = useMemo(() => {
        if (Children.count(children) > 1) {
            throw new Error('FormField cannot have more than one child.')
        }

        return isValidElement(children) ? children.props : {}
    }, [children])

    useEffect(() => {
        registerField(fieldName ?? name, validate, { onSuccess, onError })

        return () => {
            unRegisterField(fieldName ?? name)
        }
    }, [
        fieldName,
        name,
        onError,
        onSuccess,
        registerField,
        unRegisterField,
        validate,
    ])

    return isValidElement(children)
        ? cloneElement(children, {
              ...children.props,
              value: values[fieldName],
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(e)
                  childOnChange(e)
              },
              onBlur,
          })
        : null
}
