import { fireEvent, render, screen } from '@testing-library/react'
import { Form, FormProvider, useFormContext } from 'formula-one'
import { type FormProviderProps } from 'formula-one/src/FormProvider'
import { Fragment, useMemo } from 'react'

import { LetterKey, type LetterKeyProps } from '.'

const defaultProps: LetterKeyProps = {
    variant: 'default',
    isDisabled: false,
    children: 'a',
}

const defaultFormProviderProps: FormProviderProps = {
    onSubmit: () => {},
    initialValues: {
        'input-item-1': '',
        'input-item-2': '',
        'input-item-3': '',
    },
}

const MockForm: React.FC = () => {
    const { register } = useFormContext()
    const fields = useMemo(
        () =>
            [1, 2, 3].map((item) => (
                <Fragment key={item}>
                    <label htmlFor={`input-item-${item}`}>input {item}</label>
                    <input
                        id={`input-item-${item}`}
                        {...register({
                            type: 'text',
                            name: `input-item-${item}`,
                            required: false,
                        })}
                    />
                </Fragment>
            )),
        [register],
    )
    return <Form>{fields}</Form>
}

const renderComponent = ({
    componentProps,
    providerProps,
}: {
    componentProps?: Partial<LetterKeyProps>
    providerProps?: Partial<FormProviderProps>
}) =>
    render(
        <FormProvider {...defaultFormProviderProps} {...providerProps}>
            <MockForm />
            <LetterKey variant="default">z</LetterKey>
            <LetterKey {...defaultProps} {...componentProps} />
        </FormProvider>,
    )

describe('LetterKey', () => {
    describe('Typing Behaviour', async () => {
        it('inputs printable data-key value into first available empty field on each click', () => {
            const letter = 'a'
            renderComponent({ componentProps: { children: letter } })

            const letterKey: HTMLButtonElement = screen.getByRole('button', {
                name: letter,
            })
            const firstInput: HTMLInputElement = screen.getByRole('textbox', {
                name: /input 1/,
            })
            const secondInput: HTMLInputElement = screen.getByRole('textbox', {
                name: /input 2/,
            })
            const thirdInput: HTMLInputElement = screen.getByRole('textbox', {
                name: /input 3/,
            })

            expect(firstInput.value).toBe('')

            fireEvent.click(letterKey)
            expect(firstInput.value).toBe(letter)
            expect(secondInput.value).toBe('')

            fireEvent.click(letterKey)
            expect(secondInput.value).toBe(letter)
            expect(thirdInput.value).toBe('')

            fireEvent.click(letterKey)
            expect(thirdInput.value).toBe(letter)
        })

        it('submits form when data-key is "Enter"', () => {
            const mockSubmit = vi.fn()
            const keyCode = 'Enter'
            renderComponent({
                componentProps: { keyCode, label: keyCode },
                providerProps: { onSubmit: mockSubmit },
            })

            const enterKey = screen.getByRole('button', { name: keyCode })
            fireEvent.click(enterKey)

            expect(mockSubmit).toHaveBeenCalledTimes(1)
        })

        it('backspaces the character in the rightmost field when data-key is "Backspace"', () => {
            const keyCode = 'Backspace'
            renderComponent({
                componentProps: { keyCode, label: keyCode },
            })

            const backspaceKey = screen.getByRole('button', { name: keyCode })
            const letterKey = screen.getByRole('button', { name: 'z' })
            const firstInput: HTMLInputElement = screen.getByRole('textbox', {
                name: /input 1/,
            })
            const secondInput: HTMLInputElement = screen.getByRole('textbox', {
                name: /input 2/,
            })

            fireEvent.click(backspaceKey)
            expect(firstInput.value).toBe('')

            fireEvent.click(letterKey)
            expect(firstInput.value).toBe('z')

            fireEvent.click(letterKey)
            expect(secondInput.value).toBe('z')

            fireEvent.click(backspaceKey)
            expect(firstInput.value).toBe('z')
            expect(secondInput.value).toBe('')

            fireEvent.click(backspaceKey)
            expect(firstInput.value).toBe('')
            expect(secondInput.value).toBe('')
        })
    })
})
