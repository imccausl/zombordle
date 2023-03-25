import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FormProvider, type FormProviderProps } from '../FormProvider'

import { Field, type FormFieldProps, type UseFieldProps, useField } from '.'

const defaultFieldProps: UseFieldProps = { name: 'test-field' }
const initialValues = { 'test-field': 'some text' }
const defaultProviderProps: FormProviderProps = {
    onSubmit: () => {},
    initialValues,
}

const Wrapper: React.FC<any> = ({ children, ...props }) => (
    <FormProvider {...defaultProviderProps} {...props}>
        {children}
    </FormProvider>
)

describe('Field', () => {
    describe('useField hook', () => {
        const renderHookWithProvider = (
            wrapperProps: Partial<FormProviderProps> = {},
        ) =>
            renderHook(() => useField({ ...defaultFieldProps }), {
                wrapper: Wrapper,
                initialProps: {
                    ...wrapperProps,
                },
            })

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

        describe('validation', () => {
            const UseFieldComponent: React.FC<Omit<UseFieldProps, 'name'>> = (
                props,
            ) => {
                const { field, meta } = useField({
                    name: 'test-input',
                    ...props,
                })

                return (
                    <>
                        <input type="text" {...field} />
                        <div>{meta.error}</div>
                    </>
                )
            }

            const InputWithProvider: React.FC<
                Omit<UseFieldProps, 'name'> & {
                    initialValue?: string
                }
            > = ({ initialValue, ...props }) => (
                <Wrapper
                    validateOnBlur={true}
                    initialValues={{ 'test-input': initialValue ?? '' }}
                >
                    <UseFieldComponent {...props} />
                </Wrapper>
            )

            it('provides an error message when validation fails', async () => {
                const errorMessage = "value cannot be the word 'invalid'"
                const fieldValidateFn = vi.fn((value: string) => {
                    if (value === 'invalid') {
                        return errorMessage
                    }
                })
                const user = userEvent.setup()
                render(<InputWithProvider validate={fieldValidateFn} />)

                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
                expect(fieldValidateFn).not.toHaveBeenCalled()
                await user.type(screen.getByRole('textbox'), 'invalid')
                // tab away from field to trigger validationOnBlur
                await userEvent.tab()
                expect(fieldValidateFn).toHaveBeenCalledTimes(1)
                expect(screen.queryByText(errorMessage)).toBeInTheDocument()
            })
            it.todo(
                'provides the configured error message if field is required and input is missing',
            )
            it.todo(
                'does not provide an error message if the field is not required with no input',
            )
            it.todo(
                'does not provide an error message when valdiation is successful',
            )
            it.todo("sets aria-invalid to true when there's an error")
            it.todo('sets aria-required to true when input is required')
            it.todo('calls the onValid callback when input is valid')
            it.todo('calls the onInvalid callback when input is invalid')
        })
    })

    describe.todo('child prop render function', () => {})

    describe.todo('single child element', () => {})
})
