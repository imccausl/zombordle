import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FormProvider, type FormProviderProps } from '../FormProvider'

import { Field, type FormFieldProps, useField } from '.'

const defaultHookProps = { name: 'test-field' }
const initialValues = {}

const wrapper: React.FC<FormProviderProps> = ({
    children,
    validateOnBlur,
    validateOnChange,
    onSubmit,
    initialValues = {},
}) => (
    <FormProvider
        validateOnBlur={validateOnBlur}
        validateOnChange={validateOnChange}
        onSubmit={onSubmit}
        initialValues={initialValues}
    >
        {children}{' '}
    </FormProvider>
)

const renderHookWithProvider = (useFieldArgs = {}, providerProps = {}) =>
    renderHook(() => useField({ ...useFieldArgs, ...defaultHookProps }), {
        wrapper,
        initialProps: { ...providerProps },
    })

describe('Field', () => {
    describe('useField hook', () => {})

    describe('child prop render function', () => {})

    describe('single child element', () => {})
})
