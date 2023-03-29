import { act, render, renderHook, screen } from '@testing-library/react'
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
        it.todo('validates input on blur when `validateOnBlur` is true')
        it.todo('validates input on change when `validateOnChange is true')
    })

    describe('form functions', () => {
        it.todo('validates all fields on submit')
        it.todo('can reset form state')
        it.todo('moves focus to first invalid field on submit')
    })
})
