import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { VariantBorder, VariantColor } from './InputTile.styles'

import InputTile, { type InputTileProps } from '.'

const defaultProps: InputTileProps = {
    onChange: () => {},
    onKeyDown: () => {},
    onFocus: () => {},
    name: '',
    value: '',
}

const renderWithProps = (props: Partial<InputTileProps> = {}) =>
    render(<InputTile {...defaultProps} {...props} />)

describe('InputTile', () => {
    it('renders default variant', () => {
        renderWithProps()

        const inputTile = screen.getByRole('textbox')

        expect(inputTile).toBeInTheDocument()
        expect(inputTile).toHaveStyle(
            `background-color: ${VariantColor.default}`,
        )
        expect(inputTile).toHaveStyle(`border-color: ${VariantBorder.default}`)
    })

    it('can be initialized with a value', () => {
        renderWithProps({ value: 'f' })

        const inputTile: HTMLInputElement = screen.getByRole('textbox')

        expect(inputTile.value).toBe('f')
    })

    it('can be provided with an accessible name', () => {
        renderWithProps({ label: '1st letter' })

        const inputTile: HTMLInputElement = screen.getByRole('textbox')

        expect(inputTile).toHaveAccessibleName('1st letter')
    })

    it('calls onChange when value changes', async () => {
        const onChangeSpy = vi.fn()
        const user = userEvent.setup()
        renderWithProps({ onChange: onChangeSpy })

        const inputTile: HTMLInputElement = screen.getByRole('textbox')
        await user.type(inputTile, 'd')
        expect(onChangeSpy).toHaveBeenCalledOnce()
    })

    it('calls onKeyDown when value changes', async () => {
        const onKeyDownSpy = vi.fn()
        const user = userEvent.setup()
        renderWithProps({ onKeyDown: onKeyDownSpy })

        const inputTile: HTMLInputElement = screen.getByRole('textbox')
        await user.type(inputTile, 'd')
        expect(onKeyDownSpy).toHaveBeenCalledOnce()
    })

    it('calls onFocus when it has focus', () => {
        const onFocusSpy = vi.fn()
        renderWithProps({ onFocus: onFocusSpy })

        const inputTile: HTMLInputElement = screen.getByRole('textbox')

        expect(onFocusSpy).not.toHaveBeenCalled()

        inputTile.focus()
        expect(onFocusSpy).toHaveBeenCalledOnce()
    })
})
