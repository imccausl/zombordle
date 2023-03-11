import { render, screen, waitFor } from '@testing-library/react'
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
        const StatefulTiledInput: React.FC = () => {
            const [value, setValue] = React.useState('some')
            const handleOnChange = React.useCallback(
                (newValue: string) => {
                    setValue(newValue)
                },
                [setValue],
            )

            return (
                <TiledInput
                    {...defaultProps}
                    value={value}
                    onChange={handleOnChange}
                />
            )
        }

        it('moves focus forward as each typed letter goes in a separate input', async () => {
            const user = userEvent.setup()
            renderWithProps()

            await user.type(screen.getByLabelText('1st letter'), 's')

            const secondLetter = screen.getByLabelText('2nd letter')
            expect(secondLetter).toHaveFocus()
            await user.type(secondLetter, 'o')

            const thirdLetter = screen.getByLabelText('3rd letter')
            expect(thirdLetter).toHaveFocus()
            await user.type(thirdLetter, 'm')

            const fourthLetter = screen.getByLabelText('4th letter')
            expect(fourthLetter).toHaveFocus()
            await user.type(fourthLetter, 'e')

            expect(screen.getByLabelText('5th letter')).toHaveFocus()
        })

        it('moves focus backward and removes letters when deleting', async () => {
            render(<StatefulTiledInput />)

            const fifthLetter: HTMLInputElement =
                screen.getByLabelText('5th letter')
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
                '3rd letter',
            )
            expect(thirdLetter).toHaveFocus()
            expect(thirdLetter.value).toBe('m')
            await userEvent.keyboard('{Backspace}')
            expect(thirdLetter.value).toBe('')

            const secondLetter: HTMLInputElement = await screen.findByLabelText(
                '2nd letter',
            )
            expect(secondLetter).toHaveFocus()
            expect(secondLetter.value).toBe('o')

            await userEvent.keyboard('{Backspace}')
            expect(secondLetter.value).toBe('')

            const firstLetter: HTMLInputElement = await screen.findByLabelText(
                '1st letter',
            )
            expect(firstLetter).toHaveFocus()
            expect(firstLetter.value).toBe('s')

            await userEvent.keyboard('{Backspace}')
            expect(firstLetter.value).toBe('')
            expect(firstLetter).toHaveFocus()
        })

        it.todo(
            'can remove letters from the middle of a word and keep the remainder in place',
        )
        it.todo('calls onChange when the input changes')
        it.todo('calls onSubmit when the input is submitted')
        it.todo('can move focus between inputs with the left/right arrow keys')
    })

    describe.todo('Input Validation')
})
