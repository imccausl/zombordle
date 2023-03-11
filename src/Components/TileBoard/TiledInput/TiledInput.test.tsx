import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import TiledInput, { type TiledInputProps } from '.'

const defaultProps: TiledInputProps = {
    length: 10,
    value: '',
    onChange: () => {},
    onSubmit: () => {},
}

const renderWithProps = (props: Partial<TiledInputProps> = {}) =>
    render(<TiledInput {...defaultProps} {...props} />)

describe('TiledBlank', () => {
    it('renders blank squares corresponding to the length of the correct word', () => {
        renderWithProps()

        const allBlankTiles = screen.getAllByRole('textbox')

        expect(allBlankTiles).toHaveLength(10)
    })

    it('renders letters of guess in 1 tile per letter with blank tiles for any letters remaining', () => {
        renderWithProps({ value: 'some' })
        const correctContent = ['s', 'o', 'm', 'e'].concat(Array(6).fill(''))
        const allTiles: HTMLInputElement[] = screen.getAllByRole('textbox')

        expect(allTiles).toHaveLength(10)
        allTiles.forEach((tile, index) => {
            expect(tile.value).toBe(correctContent[index])
        })
    })

    describe('Basic Functions', () => {
        const StatefulTiledInput: React.FC<{
            initialValue: string
            onChange?: (value: string) => void
            onSubmit?: (value: string) => void
        }> = ({ initialValue, onChange, onSubmit }) => {
            const [value, setValue] = React.useState(initialValue)
            const handleOnChange = React.useCallback(
                (newValue: string) => {
                    setValue(newValue)
                    onChange?.(newValue)
                },
                [setValue, onChange],
            )
            const handleOnSubmit = React.useCallback(
                () => void onSubmit?.(value),
                [onSubmit, value],
            )

            return (
                <TiledInput
                    {...defaultProps}
                    value={value}
                    onChange={handleOnChange}
                    onSubmit={handleOnSubmit}
                />
            )
        }

        it('moves focus forward as each typed letter goes in a separate input', async () => {
            const user = userEvent.setup()
            renderWithProps()

            await user.type(screen.getByLabelText(/1st/), 's')

            const secondLetter = screen.getByLabelText(/2nd/)
            expect(secondLetter).toHaveFocus()
            await user.type(secondLetter, 'o')

            const thirdLetter = screen.getByLabelText(/3rd/)
            expect(thirdLetter).toHaveFocus()
            await user.type(thirdLetter, 'm')

            const fourthLetter = screen.getByLabelText(/4th/)
            expect(fourthLetter).toHaveFocus()
            await user.type(fourthLetter, 'e')

            expect(screen.getByLabelText(/5th/)).toHaveFocus()
            await user.type(screen.getByLabelText(/5th/), 'things')
            expect(screen.getByLabelText(/10th/)).toHaveFocus()
        })

        it('moves focus backward and removes letters when deleting', async () => {
            render(<StatefulTiledInput initialValue="some" />)

            const fifthLetter: HTMLInputElement = screen.getByLabelText(/5th/)
            fifthLetter.focus()
            expect(fifthLetter.value).toBe('')

            await userEvent.keyboard('{Backspace}')
            const fourthLetter: HTMLInputElement = await screen.findByLabelText(
                '4th letter',
            )
            expect(fourthLetter.value).toBe('e')
            expect(fourthLetter).toHaveFocus()

            await userEvent.keyboard('{Backspace}')
            expect(fourthLetter.value).toBe('')

            const thirdLetter: HTMLInputElement = await screen.findByLabelText(
                /3rd/,
            )
            expect(thirdLetter).toHaveFocus()
            expect(thirdLetter.value).toBe('m')
            await userEvent.keyboard('{Backspace}')
            expect(thirdLetter.value).toBe('')

            const secondLetter: HTMLInputElement = await screen.findByLabelText(
                /2nd/,
            )
            expect(secondLetter).toHaveFocus()
            expect(secondLetter.value).toBe('o')

            await userEvent.keyboard('{Backspace}')
            expect(secondLetter.value).toBe('')

            const firstLetter: HTMLInputElement = await screen.findByLabelText(
                /1st/,
            )
            expect(firstLetter).toHaveFocus()
            expect(firstLetter.value).toBe('s')

            await userEvent.keyboard('{Backspace}')
            expect(firstLetter.value).toBe('')
            expect(firstLetter).toHaveFocus()
        })

        it('can remove letters from the middle of a word and keep the remainder in place', async () => {
            const deriveStringFromInputs = (inputEls: HTMLInputElement[]) =>
                inputEls.reduce(
                    (acc, input) =>
                        acc.concat(input.value === '' ? ' ' : input.value),
                    '',
                )
            render(<StatefulTiledInput initialValue="foundation" />)

            const middleLetter: HTMLInputElement = screen.getByLabelText(/5th/)
            middleLetter.focus()
            expect(middleLetter.value).toBe('d')

            await userEvent.keyboard('{Backspace}')
            expect(middleLetter.value).toBe('')

            expect(deriveStringFromInputs(screen.getAllByRole('textbox'))).toBe(
                'foun ation',
            )

            const secondLastLetter: HTMLInputElement =
                screen.getByLabelText(/9th/)
            secondLastLetter.focus()
            expect(secondLastLetter.value).toBe('o')

            await userEvent.keyboard('{Backspace}')
            expect(secondLastLetter.value).toBe('')

            expect(deriveStringFromInputs(screen.getAllByRole('textbox'))).toBe(
                'foun ati n',
            )

            const firstLetter: HTMLInputElement = screen.getByLabelText(/1st/)
            firstLetter.focus()
            expect(firstLetter.value).toBe('f')

            await userEvent.keyboard('{Backspace}')
            expect(firstLetter.value).toBe('')

            expect(deriveStringFromInputs(screen.getAllByRole('textbox'))).toBe(
                ' oun ati n',
            )
        })

        it('calls onChange when the input changes', async () => {
            const onChangeSpy = vi.fn()
            const user = userEvent.setup()
            render(
                <StatefulTiledInput initialValue="" onChange={onChangeSpy} />,
            )

            await user.type(screen.getByLabelText(/1st/), 'test')
            expect(screen.getByLabelText(/5th/)).toHaveFocus()
            expect(onChangeSpy).toHaveBeenCalledWith(
                expect.stringContaining('test'),
            )
            expect(onChangeSpy).toHaveBeenCalledTimes(4)
        })

        it('calls onSubmit when the a word is submitted', async () => {
            const onSubmitSpy = vi.fn()
            const user = userEvent.setup()
            render(
                <StatefulTiledInput initialValue="" onSubmit={onSubmitSpy} />,
            )

            await user.type(screen.getByLabelText(/1st/), 'foundation')
            expect(screen.getByLabelText(/10th/)).toHaveFocus()
            expect(onSubmitSpy).not.toHaveBeenCalled()

            await userEvent.keyboard('{Enter}')
            expect(onSubmitSpy).toHaveBeenCalledWith('foundation')
            expect(onSubmitSpy).toHaveBeenCalledTimes(1)
        })

        it('does not call onSubmit if there are too few letters in the word', async () => {
            const onSubmitSpy = vi.fn()
            const user = userEvent.setup()
            render(
                <StatefulTiledInput initialValue="" onSubmit={onSubmitSpy} />,
            )

            await user.type(screen.getByLabelText(/1st/), 'something')
            expect(screen.getByLabelText(/10th/)).toHaveFocus()
            expect(onSubmitSpy).not.toHaveBeenCalled()

            await userEvent.keyboard('{Enter}')
            expect(onSubmitSpy).not.toHaveBeenCalled()
        })

        describe('Arrow Key Navigation', () => {
            it('moves focus right when right arrow key pressed', async () => {
                renderWithProps()

                const firstInput: HTMLInputElement =
                    screen.getByLabelText(/1st/)
                firstInput.focus()

                await userEvent.keyboard('{ArrowRight}')
                expect(screen.getByLabelText(/2nd/)).toHaveFocus()
                await userEvent.keyboard('{ArrowRight}')
                expect(screen.getByLabelText(/3rd/)).toHaveFocus()
                await userEvent.keyboard('{ArrowRight}')
                expect(screen.getByLabelText(/4th/)).toHaveFocus()
            })

            it('moves focus left when left arrow key pressed', async () => {
                renderWithProps()

                const lastInput: HTMLInputElement =
                    screen.getByLabelText(/10th/)
                lastInput.focus()

                await userEvent.keyboard('{ArrowLeft}')
                expect(screen.getByLabelText(/9th/)).toHaveFocus()
                await userEvent.keyboard('{ArrowLeft}')
                expect(screen.getByLabelText(/8th/)).toHaveFocus()
                await userEvent.keyboard('{ArrowLeft}')
                expect(screen.getByLabelText(/7th/)).toHaveFocus()
            })

            it('does not move focus with left arrow key if on first element', async () => {
                renderWithProps()

                const firstInput = screen.getByLabelText(/1st/)
                screen.getByLabelText(/2nd/).focus()

                expect(firstInput).not.toHaveFocus()
                await userEvent.keyboard('{ArrowLeft}')
                expect(firstInput).toHaveFocus()
                await userEvent.keyboard('{ArrowLeft}')
                expect(firstInput).toHaveFocus()
            })

            it('does not move focus with right arrow key if on last element', async () => {
                renderWithProps()

                const lastInput = screen.getByLabelText(/10th/)
                screen.getByLabelText(/9th/).focus()

                expect(lastInput).not.toHaveFocus()
                await userEvent.keyboard('{ArrowRight}')
                expect(lastInput).toHaveFocus()
                await userEvent.keyboard('{ArrowRight}')
                expect(lastInput).toHaveFocus()
            })
        })
    })

    describe.todo('Input Validation')
})
