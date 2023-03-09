import { render as renderComponent, screen } from '@testing-library/react'

import TiledInput, { type TiledInputProps } from '.'

const defaultProps: TiledInputProps = {
    length: 10,
    value: '',
    onChange: () => {},
    onSubmit: () => {},
}

const render = (props: Partial<TiledInputProps> = {}) =>
    renderComponent(<TiledInput {...defaultProps} {...props} />)

describe('TiledBlank', () => {
    it('renders blank squares corresponding to the length of the correct word', () => {
        render()

        const allBlankTiles = screen.getAllByRole('textbox')

        expect(allBlankTiles).toHaveLength(10)
    })

    it('renders letters of guess in 1 tile per letter with blank tiles for any letters remaining', () => {
        render({ value: 'some' })
        const correctContent = ['s', 'o', 'm', 'e'].concat(Array(6).fill(''))
        const allTiles: HTMLInputElement[] = screen.getAllByRole('textbox')

        expect(allTiles).toHaveLength(10)
        allTiles.forEach((tile, index) => {
            expect(tile.value).toBe(correctContent[index])
        })
    })

    describe('Basic Functions', () => {
        it.todo(
            'moves focus forward as each typed letter goes in a separate input',
        )
        it.todo('moves focus backward and removes letters when deleting')
        it.todo(
            'can remove letters from the middle of a word and keep the remainder in place',
        )
        it.todo('calls onChange when the input changes')
        it.todo('calls onSubmit when the input is submitted')
        it.todo('can move focus between inputs with the left/right arrow keys')
    })

    describe.todo('Input Validation')
})
