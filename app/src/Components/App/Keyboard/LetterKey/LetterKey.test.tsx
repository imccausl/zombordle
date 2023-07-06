import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Form, FormProvider, useFormContext } from 'formula-one'
import { type FormProviderProps } from 'formula-one/src/FormProvider'
import { Fragment } from 'react'

import { LetterKey, type LetterKeyProps } from '.'

const defaultProps: LetterKeyProps = {
    variant: 'default',
    isDisabled: false,
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

    return (
        <Form>
            {[1, 2, 3].map((item) => (
                <Fragment key={item}>
                    <label htmlFor={`input-item-${item}`}>input {item}</label>
                    <input
                        id={`input-item-${item}`}
                        {...register({
                            type: 'text',
                            name: `input-${item}`,
                            required: true,
                        })}
                    />
                </Fragment>
            ))}
        </Form>
    )
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
            <LetterKey {...defaultProps} {...componentProps} />
        </FormProvider>,
    )

describe('LetterKey', () => {
    describe('Typing Behaviour', async () => {
        it('inputs printable data-key value into first available empty field', async () => {
            const letter = 'a'
            renderComponent({ componentProps: { children: letter } })

            const letterKey = screen.getByRole('button', { name: letter })
            const firstInput = screen.getByRole('textbox', { name: /input 1/ })
            const secondInput = screen.getByRole('textbox', { name: /input 1/ })
            const thirdInput = screen.getByRole('textbox', { name: /input 1/ })

            waitFor(
                () => void expect(firstInput.getAttribute('value')).toBe(''),
            )

            fireEvent.click(letterKey)

            waitFor(
                () =>
                    void expect(firstInput.getAttribute('value')).toBe(letter),
            )
        })
        it.todo('submits form when data-key is "Enter"')
        it.todo(
            'backspaces the character in the rightmost field when data-key is "Backspace"',
        )
    })
})
