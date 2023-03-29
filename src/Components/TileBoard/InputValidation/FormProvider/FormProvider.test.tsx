import {
    act,
    fireEvent,
    render,
    renderHook,
    screen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { useFormContext } from './FormContext'

import { FormProvider, type FormProviderProps } from '.'

const defaultProps: FormProviderProps = {
    initialValues: {
        'test-field': '',
    },
    onSubmit: () => {},
}
const Wrapper: React.FC<any> = ({ children }) => (
    <FormProvider {...defaultProps}>{children}</FormProvider>
)

describe('FormProvider', () => {
    describe('hook functions', () => {
        const renderHookWithProvider = () =>
            renderHook(() => useFormContext(), { wrapper: Wrapper })

        it('keeps track of registered fields', () => {
            const { result } = renderHookWithProvider()
            const inputElement = document.createElement('input')
            inputElement.type = 'text'
            inputElement.name = 'test-field'
            const inputRef: React.MutableRefObject<HTMLInputElement | null> =
                React.createRef()
            inputRef.current = inputElement
            act(
                () =>
                    void result.current.registerField(
                        'test-field',
                        inputRef,
                        () => 'not valid',
                    ),
            )

            expect(result.current.getFieldRef('test-field')).toBe(inputRef)
        })

        it('can remove tracked field', () => {
            const { result } = renderHookWithProvider()
            const inputElement = document.createElement('input')
            inputElement.type = 'text'
            inputElement.name = 'test-field'
            const inputRef: React.MutableRefObject<HTMLInputElement | null> =
                React.createRef()
            inputRef.current = inputElement
            act(
                () =>
                    void result.current.registerField(
                        'test-field',
                        inputRef,
                        () => 'not valid',
                    ),
            )

            expect(result.current.getFieldRef('test-field')).toBe(inputRef)

            result.current.unRegisterField('test-field')

            expect(result.current.getFieldRef('test-field')).toBeUndefined()
        })

        it('can validate a field if provided field name and value', () => {
            const { result } = renderHookWithProvider()
            const inputElement = document.createElement('input')
            inputElement.type = 'text'
            inputElement.name = 'test-field'
            const inputRef: React.MutableRefObject<HTMLInputElement | null> =
                React.createRef()
            inputRef.current = inputElement
            act(
                () =>
                    void result.current.registerField(
                        'test-field',
                        inputRef,
                        (value) =>
                            value.includes('hi') ? 'invalid' : undefined,
                    ),
            )

            act(
                () =>
                    void expect(
                        result.current.validateField({
                            fieldName: 'test-field',
                            value: 'hi',
                        }).errorMessage,
                    ).toBe('invalid'),
            )
        })

        it('can set a field value', () => {
            const { result } = renderHookWithProvider()
            const inputElement = document.createElement('input')
            inputElement.type = 'text'
            inputElement.name = 'test-field'
            const inputRef: React.MutableRefObject<HTMLInputElement | null> =
                React.createRef()
            inputRef.current = inputElement
            act(
                () =>
                    void result.current.registerField(
                        'test-field',
                        inputRef,
                        () => 'not valid',
                    ),
            )

            expect(result.current.getFieldValues('test-field').value).toBe('')

            act(
                () =>
                    void result.current.setFieldValue(
                        'test-field',
                        'new value',
                    ),
            )
            expect(result.current.getFieldValues('test-field').value).toBe(
                'new value',
            )
        })

        it('can get the state of a field', () => {
            const { result } = renderHookWithProvider()
            const inputElement = document.createElement('input')
            inputElement.type = 'text'
            inputElement.name = 'test-field'
            const inputRef: React.MutableRefObject<HTMLInputElement | null> =
                React.createRef()
            inputRef.current = inputElement
            act(
                () =>
                    void result.current.registerField(
                        'test-field',
                        inputRef,
                        () => 'not valid',
                    ),
            )

            expect(result.current.getFieldState('test-field')).toStrictEqual({
                error: undefined,
                touched: undefined,
                value: '',
            })

            act(
                () =>
                    void result.current.setFieldValue(
                        'test-field',
                        'new value',
                    ),
            )
            expect(result.current.getFieldState('test-field')).toStrictEqual({
                error: undefined,
                touched: undefined,
                value: 'new value',
            })
        })
    })

    describe('input functions', () => {
        const InputComponent: React.FC = () => {
            const inputRef = React.useRef(null)
            const {
                getFieldState,
                onChange,
                onBlur,
                registerField,
                unRegisterField,
            } = useFormContext()

            React.useEffect(() => {
                registerField('test-input', inputRef, (value) =>
                    value === 'invalid' ? 'invalid input' : undefined,
                )

                return () => {
                    unRegisterField('test-input')
                }
            })

            const { error } = getFieldState('test-input')
            return (
                <>
                    <input
                        ref={inputRef}
                        type="text"
                        name="test-input"
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    <div role="alert">{error ?? ''}</div>
                </>
            )
        }

        const renderInputComponent = (
            props: Partial<FormProviderProps> = {},
        ) => {
            render(
                <FormProvider {...defaultProps} {...props}>
                    <InputComponent />
                </FormProvider>,
            )
        }

        it('validates input on blur when `validateOnBlur` is true', async () => {
            const user = userEvent.setup()
            renderInputComponent({
                validateOnBlur: true,
                initialValues: {
                    'test-input': 'nothing',
                },
            })

            expect(screen.getByRole('alert').textContent).toBe('')

            await user.type(screen.getByRole('textbox'), 'invalid')
            expect(screen.getByRole('alert').textContent).toBe('')

            await userEvent.tab()
            expect(screen.getByRole('alert').textContent).toBe('invalid input')
        })

        it('validates input on change when `validateOnChange is true', async () => {
            const user = userEvent.setup()
            renderInputComponent({
                validateOnChange: true,
                initialValues: {
                    'test-input': '',
                },
            })

            expect(screen.getByRole('alert').textContent).toBe('')

            await user.type(screen.getByRole('textbox'), 'inval')
            expect(screen.getByRole('alert').textContent).toBe('')
            await user.type(screen.getByRole('textbox'), 'id')
            expect(screen.getByRole('alert').textContent).toBe('invalid input')
            await user.type(screen.getByRole('textbox'), '{Backspace}')
            expect(screen.getByRole('alert').textContent).toBe('')
        })
    })

    describe('form functions', () => {
        const FormComponent: React.FC = () => {
            const {
                onSubmit,
                onChange,
                registerField,
                unRegisterField,
                getFieldState,
                resetFormState,
            } = useFormContext()

            const { error: testInput1Error, value: testInput1Value } =
                getFieldState('test-input')
            const { error: testInput2Error, value: testInput2Value } =
                getFieldState('test-input2')
            const inputRef = React.useRef<HTMLInputElement>(null)
            const inputRef2 = React.useRef<HTMLInputElement>(null)
            React.useEffect(() => {
                registerField('test-input', inputRef, (value) =>
                    value === 'invalid' ? 'invalid input' : undefined,
                )
                registerField('test-input2', inputRef2, (value) =>
                    value === 'somewhat invalid'
                        ? 'invalid input also'
                        : undefined,
                )

                return () => {
                    unRegisterField('test-input')
                    unRegisterField('test-input2')
                }
            }, [registerField, unRegisterField])

            return (
                <>
                    <form
                        noValidate
                        onSubmit={onSubmit}
                        onReset={resetFormState}
                        aria-label="test form"
                    >
                        <input
                            aria-label="input 1"
                            ref={inputRef}
                            type="text"
                            name="test-input"
                            onChange={onChange}
                            value={testInput1Value}
                        />
                        <input
                            aria-label="input 2"
                            ref={inputRef2}
                            type="text"
                            name="test-input2"
                            onChange={onChange}
                            value={testInput2Value}
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <div role="alert">
                        {JSON.stringify({
                            error1: testInput1Error,
                            error2: testInput2Error,
                        })}
                    </div>
                </>
            )
        }

        const renderFormComponent = () =>
            render(
                <FormProvider
                    {...defaultProps}
                    initialValues={{ 'test-input': '', 'test-input2': '' }}
                >
                    <FormComponent />
                </FormProvider>,
            )

        it('validates all fields on submit', async () => {
            const user = userEvent.setup()
            renderFormComponent()

            fireEvent.submit(screen.getByRole('form'))
            expect(screen.getByRole('alert').textContent).toBe('{}')

            await user.type(
                screen.getByRole('textbox', { name: /input 1/ }),
                'invalid',
            )
            await user.type(
                screen.getByRole('textbox', { name: /input 2/ }),
                'somewhat invalid',
            )
            expect(screen.getByRole('alert').textContent).toBe('{}')

            fireEvent.submit(screen.getByRole('form'))
            expect(screen.getByRole('alert').textContent).toBe(
                '{"error1":"invalid input","error2":"invalid input also"}',
            )
        })

        it('can reset form state', async () => {
            const user = userEvent.setup()
            renderFormComponent()

            await user.type(
                screen.getByRole('textbox', { name: /input 1/ }),
                'some text',
            )
            await user.type(
                screen.getByRole('textbox', { name: /input 2/ }),
                'some more text',
            )

            expect(
                screen
                    .getByRole('textbox', { name: /input 1/ })
                    .getAttribute('value'),
            ).toBe('some text')
            expect(
                screen
                    .getByRole('textbox', { name: /input 2/ })
                    .getAttribute('value'),
            ).toBe('some more text')

            fireEvent.reset(screen.getByRole('form'))

            expect(
                screen
                    .getByRole('textbox', { name: /input 1/ })
                    .getAttribute('value'),
            ).toBe('')
            expect(
                screen
                    .getByRole('textbox', { name: /input 2/ })
                    .getAttribute('value'),
            ).toBe('')
        })

        it('moves focus to first invalid field on submit', async () => {
            const user = userEvent.setup()
            renderFormComponent()

            await user.type(
                screen.getByRole('textbox', { name: /input 2/ }),
                'somewhat invalid',
            )

            screen.getByRole('textbox', { name: /input 1/ }).focus()
            expect(
                screen.getByRole('textbox', { name: /input 1/ }),
            ).toHaveFocus()
            fireEvent.submit(screen.getByRole('form'))
            expect(screen.getByRole('alert').textContent).toBe(
                '{"error2":"invalid input also"}',
            )
            expect(
                screen.getByRole('textbox', { name: /input 2/ }),
            ).toHaveFocus()

            await user.type(
                screen.getByRole('textbox', { name: /input 1/ }),
                'invalid',
            )
            await user.type(
                screen.getByRole('textbox', { name: /input 2/ }),
                '{Backspace}{Backspace}',
            )
            expect(
                screen.getByRole('textbox', { name: /input 2/ }),
            ).toHaveFocus()

            fireEvent.submit(screen.getByRole('form'))
            expect(
                screen.getByRole('textbox', { name: /input 1/ }),
            ).toHaveFocus()
        })
    })
})
