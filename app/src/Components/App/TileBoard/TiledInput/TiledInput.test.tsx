import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider } from 'formula-one'
import React from 'react'

import TiledInput, { type TiledInputProps } from '.'

const defaultProps: TiledInputProps = {
    length: 10,
    guessNumber: 1,
}

const initialValues = new Array(defaultProps.length)
    .fill('')
    .reduce((acc, _, index: number) => {
        acc[`input-${index + 1}`] = ''
        return acc
    }, {})

const renderWithProps = (props: Partial<TiledInputProps> = {}) =>
    render(
        <FormProvider onSubmit={() => {}} initialValues={initialValues}>
            <TiledInput {...defaultProps} {...props} />
        </FormProvider>,
    )

describe('TiledInput', () => {
    it('renders blank textbox squares corresponding to the length of the correct word', () => {
        renderWithProps()
        const allBlankTiles = screen.getAllByRole('textbox')

        expect(allBlankTiles).toHaveLength(10)
    })

    it('renders letters of guess in 1 tile per letter with blank tiles for any letters remaining', async () => {
        const user = userEvent.setup()
        const correctContent = ['s', 'o', 'm', 'e']
        renderWithProps()
        await user.type(screen.getByLabelText(/1st/), 'some')
        const allTiles: HTMLInputElement[] = screen.getAllByRole('textbox')

        expect(allTiles).toHaveLength(10)
        allTiles.forEach((tile, index) => {
            expect(tile.getAttribute('value')).toBe(correctContent[index] ?? '')
        })
    })

    describe('Basic Functions', () => {
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
            const user = userEvent.setup()
            renderWithProps()
            await user.type(screen.getByLabelText(/1st/), 'some')
            const fifthLetter: HTMLInputElement = screen.getByLabelText(/5th/)
            // blur triggers validation which updates the state
            act(() => void fifthLetter.focus())
            expect(fifthLetter.getAttribute('value')).toBe('')

            await userEvent.keyboard('{Backspace}')
            const fourthLetter: HTMLInputElement =
                await screen.findByLabelText('4th letter')
            expect(fourthLetter.getAttribute('value')).toBe('e')
            expect(fourthLetter).toHaveFocus()

            await userEvent.keyboard('{Backspace}')
            expect(fourthLetter.getAttribute('value')).toBe('')

            const thirdLetter: HTMLInputElement =
                await screen.findByLabelText(/3rd/)
            expect(thirdLetter).toHaveFocus()
            expect(thirdLetter.getAttribute('value')).toBe('m')
            await userEvent.keyboard('{Backspace}')
            expect(thirdLetter.getAttribute('value')).toBe('')

            const secondLetter: HTMLInputElement =
                await screen.findByLabelText(/2nd/)
            expect(secondLetter).toHaveFocus()
            expect(secondLetter.getAttribute('value')).toBe('o')

            await userEvent.keyboard('{Backspace}')
            expect(secondLetter.getAttribute('value')).toBe('')

            const firstLetter: HTMLInputElement =
                await screen.findByLabelText(/1st/)
            expect(firstLetter).toHaveFocus()
            expect(firstLetter.getAttribute('value')).toBe('s')

            await userEvent.keyboard('{Backspace}')
            expect(firstLetter.getAttribute('value')).toBe('')
            expect(firstLetter).toHaveFocus()
        })

        it('can remove letters from the middle of a word and keep the remainder in place', async () => {
            const deriveStringFromInputs = (inputEls: HTMLInputElement[]) =>
                inputEls.reduce(
                    (acc, input) =>
                        acc.concat(
                            input.getAttribute('value') === ''
                                ? ' '
                                : input.getAttribute('value') ?? '',
                        ),
                    '',
                )
            const user = userEvent.setup()
            renderWithProps()

            await user.type(screen.getByLabelText(/1st/), 'foundation')

            const middleLetter: HTMLInputElement = screen.getByLabelText(/5th/)
            // blur triggers validation which updates the state
            act(() => void middleLetter.focus())
            expect(middleLetter.getAttribute('value')).toBe('d')

            await userEvent.keyboard('{Backspace}')
            expect(middleLetter.getAttribute('value')).toBe('')

            expect(deriveStringFromInputs(screen.getAllByRole('textbox'))).toBe(
                'foun ation',
            )

            const secondLastLetter: HTMLInputElement =
                screen.getByLabelText(/9th/)
            // blur triggers validation which updates the state
            act(() => void secondLastLetter.focus())
            expect(secondLastLetter.getAttribute('value')).toBe('o')

            await userEvent.keyboard('{Backspace}')
            expect(secondLastLetter.getAttribute('value')).toBe('')

            expect(deriveStringFromInputs(screen.getAllByRole('textbox'))).toBe(
                'foun ati n',
            )

            const firstLetter: HTMLInputElement = screen.getByLabelText(/1st/)
            // blur triggers validation which updates the state
            act(() => void firstLetter.focus())
            expect(firstLetter.getAttribute('value')).toBe('f')

            await userEvent.keyboard('{Backspace}')
            expect(firstLetter.getAttribute('value')).toBe('')

            expect(deriveStringFromInputs(screen.getAllByRole('textbox'))).toBe(
                ' oun ati n',
            )
        })

        describe('Arrow Key Navigation', () => {
            it('moves focus right when right arrow key pressed', async () => {
                renderWithProps()

                const firstInput: HTMLInputElement =
                    await screen.findByLabelText(/1st/)
                // blur triggers validation which updates the state
                act(() => void firstInput.focus())

                await userEvent.keyboard('{ArrowRight}')
                expect(await screen.findByLabelText(/2nd/)).toHaveFocus()
                await userEvent.keyboard('{ArrowRight}')
                expect(screen.getByLabelText(/3rd/)).toHaveFocus()
                await userEvent.keyboard('{ArrowRight}')
                expect(screen.getByLabelText(/4th/)).toHaveFocus()
            })

            it('moves focus left when left arrow key pressed', async () => {
                renderWithProps()

                const lastInput: HTMLInputElement =
                    await screen.findByLabelText(/10th/)
                // blur triggers validation which updates the state
                act(() => void lastInput.focus())

                await userEvent.keyboard('{ArrowLeft}')
                expect(await screen.findByLabelText(/9th/)).toHaveFocus()
                await userEvent.keyboard('{ArrowLeft}')
                expect(await screen.findByLabelText(/8th/)).toHaveFocus()
                await userEvent.keyboard('{ArrowLeft}')
                expect(await screen.findByLabelText(/7th/)).toHaveFocus()
            })

            it('does not move focus with left arrow key if on first element', async () => {
                renderWithProps()

                const firstInput = screen.getByLabelText(/1st/)
                // blur triggers validation which updates the state
                act(() => void screen.getByLabelText(/2nd/).focus())

                expect(firstInput).not.toHaveFocus()
                await userEvent.keyboard('{ArrowLeft}')
                expect(firstInput).toHaveFocus()
                await userEvent.keyboard('{ArrowLeft}')
                expect(firstInput).toHaveFocus()
            })

            it('does not move focus with right arrow key if on last element', async () => {
                renderWithProps()

                const lastInput = screen.getByLabelText(/10th/)
                // blur triggers validation which updates the state
                act(() => void screen.getByLabelText(/9th/).focus())

                expect(lastInput).not.toHaveFocus()
                await userEvent.keyboard('{ArrowRight}')
                expect(lastInput).toHaveFocus()
                await userEvent.keyboard('{ArrowRight}')
                expect(lastInput).toHaveFocus()
            })
        })
    })

    describe('Input Validation', () => {
        it.todo('displays a validation tooltip on focus when input is invalid')
        it.todo('displays a validation tooltip on hover when input is invalid')
        it.todo(
            'validation tooltip goes back to invalid focused element if user hovers over another invalid input',
        )
        it.todo("positions leftmost validation tooltips with 'bottom-right")
        it.todo("postitons centermost validation tooltips with 'bottom-center'")
        it.todo("positions rightmost validation tooltips with 'bottom-left'")
    })
})
