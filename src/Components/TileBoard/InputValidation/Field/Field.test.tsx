import { act, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FormProvider, type FormProviderProps } from '../FormProvider'

import { Field, type FormFieldProps, type UseFieldProps, useField } from '.'

const defaultHookProps = { name: 'test-field' }
const initialValues = { 'test-field': 'some text' }

const defaultProviderProps: FormProviderProps = {
    onSubmit: () => {},
    initialValues,
}

const wrapper: React.FC<any> = ({ children, ...props }) => (
    <FormProvider {...defaultProviderProps} {...props}>
        {children}
    </FormProvider>
)

const renderHookWithProvider = (
    wrapperProps: Partial<FormProviderProps> = {},
) =>
    renderHook(() => useField({ ...defaultHookProps }), {
        wrapper,
        initialProps: {
            ...wrapperProps,
        },
    })

describe('Field', () => {
    describe('useField hook', () => {
        it('provides an initial value for the field', () => {
            const { result } = renderHookWithProvider()

            expect(result.current.field.value).toBe('some text')
        })

        it('provides the name of the field', () => {
            const { result } = renderHookWithProvider()

            expect(result.current.field.name).toBe('test-field')
        })

        it('changes the value of the field with setFieldValue', () => {
            const { result } = renderHookWithProvider()
            expect(result.current.field.value).toBe('some text')

            act(() => void result.current.meta.setFieldValue('something new'))
            expect(result.current.field.value).toBe('something new')
        })
    })

    describe.todo('child prop render function', () => {})

    describe.todo('single child element', () => {})
})
