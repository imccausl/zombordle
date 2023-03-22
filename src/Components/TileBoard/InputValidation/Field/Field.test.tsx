import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FormProvider } from '../FormProvider'

import { Field, type FormFieldProps, useField } from '.'

const defaultProps: FormFieldProps = {}
const initialValues = {}

const HookComponent: React.FC = () => {
    const { field, meta } = useField({ name: 'my-field' })

    return (
        <div>
            <input type="text" {...field} />
        </div>
    )
}
const renderWithProvider = (Component, props: Partial<FormFieldProps>) => {
    render(<FormProvider></FormProvider>)
}

describe('Field', () => {
    describe('useField hook', () => {})

    describe('child prop render function', () => {})

    describe('single child element', () => {})
})
