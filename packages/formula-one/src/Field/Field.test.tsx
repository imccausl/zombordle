import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FormProvider, type FormProviderProps } from '../FormProvider'

import { type UseFieldProps, useField } from '.'

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
                expect(screen.getByText(errorMessage)).toBeInTheDocument()
            })

            it('provides the configured error message if field is required and input is missing', async () => {
                const errorMessage = 'You must enter a vale'
                const user = userEvent.setup()
                render(<InputWithProvider required={errorMessage} />)
                screen.getByRole('textbox').focus()
                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
                // trigger onBlur validation
                await userEvent.tab()
                expect(screen.getByText(errorMessage)).toBeInTheDocument()

                await user.type(screen.getByRole('textbox'), 'some input')
                await userEvent.tab()
                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
            })

            it('provides the default error message if field is required without a message and input is missing', async () => {
                const user = userEvent.setup()
                render(<InputWithProvider required />)
                screen.getByRole('textbox').focus()
                expect(
                    screen.queryByText(/cannot be empty/),
                ).not.toBeInTheDocument()
                // trigger onBlur validation
                await userEvent.tab()
                expect(screen.getByText(/cannot be empty/)).toBeInTheDocument()

                await user.type(screen.getByRole('textbox'), 'some input')
                await userEvent.tab()
                expect(
                    screen.queryByText(/cannot be empty/),
                ).not.toBeInTheDocument()
            })

            it('does not provide an error message if the field is not required with no input', async () => {
                render(<InputWithProvider />)
                screen.getByRole('textbox').focus()
                expect(
                    screen.queryByText(/cannot be empty/),
                ).not.toBeInTheDocument()
                // trigger onBlur validation
                await userEvent.tab()
                expect(
                    screen.queryByText(/cannot be empty/),
                ).not.toBeInTheDocument()
            })

            it('does not provide an error message when valdiation is successful', async () => {
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
                expect(screen.getByText(errorMessage)).toBeInTheDocument()

                await user.type(screen.getByRole('textbox'), 'something else')
                // tab away from field to trigger validationOnBlur
                await userEvent.tab()
                fieldValidateFn.mockReset()
                expect(fieldValidateFn).not.toHaveBeenCalled()
                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
            })

            it("sets aria-invalid to true when there's an error", async () => {
                const errorMessage = "value cannot be the word 'invalid'"
                const fieldValidateFn = (value: string) => {
                    if (value === 'invalid') {
                        return errorMessage
                    }
                }
                const user = userEvent.setup()
                render(<InputWithProvider validate={fieldValidateFn} />)

                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
                expect(
                    screen.getByRole('textbox').getAttribute('aria-invalid'),
                ).toBe('false')
                await user.type(screen.getByRole('textbox'), 'invalid')
                // tab away from field to trigger validationOnBlur
                await userEvent.tab()
                expect(screen.getByText(errorMessage)).toBeInTheDocument()
                expect(
                    screen.getByRole('textbox').getAttribute('aria-invalid'),
                ).toBe('true')
                await user.type(screen.getByRole('textbox'), 'something else')
                // tab away from field to trigger validationOnBlur
                await userEvent.tab()
                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
                expect(
                    screen.getByRole('textbox').getAttribute('aria-invalid'),
                ).toBe('false')
            })

            it('sets aria-required to true when input is required with message', () => {
                render(<InputWithProvider required="la de da de" />)

                expect(
                    screen.getByRole('textbox').getAttribute('aria-required'),
                ).toBe('true')
            })

            it('sets aria-required to true when input is required with no message', () => {
                render(<InputWithProvider required />)

                expect(
                    screen.getByRole('textbox').getAttribute('aria-required'),
                ).toBe('true')
            })

            it('sets aria-required to false when input is not required', () => {
                render(<InputWithProvider />)

                expect(
                    screen.getByRole('textbox').getAttribute('aria-required'),
                ).toBe('false')
            })

            it('calls the onValid callback when input is valid', async () => {
                const onValidCallback = vi.fn()
                const errorMessage = "value cannot be the word 'invalid'"
                const fieldValidateFn = (value: string) => {
                    if (value === 'invalid') {
                        return errorMessage
                    }
                }
                const user = userEvent.setup()
                render(
                    <InputWithProvider
                        validate={fieldValidateFn}
                        onValid={onValidCallback}
                    />,
                )

                await user.type(screen.getByRole('textbox'), 'invalid')
                // tab away from field to trigger validationOnBlur
                await userEvent.tab()
                expect(screen.getByText(errorMessage)).toBeInTheDocument()
                expect(onValidCallback).not.toHaveBeenCalled()
                await user.type(screen.getByRole('textbox'), 'something else')
                // tab away from field to trigger validationOnBlur
                await userEvent.tab()
                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
                expect(onValidCallback).toHaveBeenCalledTimes(1)
            })

            it('calls the onInvalid callback when input is invalid', async () => {
                const onInvalidCallback = vi.fn()
                const errorMessage = "value cannot be the word 'invalid'"
                const fieldValidateFn = (value: string) => {
                    if (value === 'invalid') {
                        return errorMessage
                    }
                }
                const user = userEvent.setup()
                render(
                    <InputWithProvider
                        validate={fieldValidateFn}
                        onInvalid={onInvalidCallback}
                    />,
                )

                await user.type(screen.getByRole('textbox'), 'invalid')
                // tab away from field to trigger validationOnBlur
                await userEvent.tab()
                expect(screen.getByText(errorMessage)).toBeInTheDocument()
                expect(onInvalidCallback).toHaveBeenCalledTimes(1)
                onInvalidCallback.mockReset()
                await user.type(screen.getByRole('textbox'), 'something else')
                // tab away from field to trigger validationOnBlur
                await userEvent.tab()
                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
                expect(onInvalidCallback).not.toHaveBeenCalled()
            })
        })
    })

    describe.todo('child prop render function', () => {})

    describe.todo('single child element', () => {})
})
