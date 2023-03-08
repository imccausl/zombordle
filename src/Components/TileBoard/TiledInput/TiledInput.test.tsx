import { render as renderComponent, screen } from '@testing-library/react'

import TiledInput, { type TiledInputProps } from '.'

const defaultProps: TiledInputProps = {
    length: 10,
    value: '',
    onChange: () => {},
}

const render = (props: Partial<TiledInputProps> = {}) =>
    renderComponent(<TiledInput {...defaultProps} {...props} />)

describe('TiledBlank', () => {
    it('renders blank squares corresponding to the length of the correct word', () => {
        render()

        const allBlankTiles = screen.getAllByRole('listitem')

        expect(allBlankTiles).toHaveLength(10)
    })

    it('renders letters for amount of tiles that correspond with the guess', () => {
        render({ value: 'some' })

        const allTiles = screen.getAllByRole('listitem')
        const allLetterTiles = screen.getAllByText(/(s|o|m|e)/)

        screen.getByText(/s/)
        screen.getByText(/o/)
        screen.getByText(/m/)
        screen.getByText(/e/)

        expect(allTiles).toHaveLength(10)
        expect(allLetterTiles).toHaveLength(4)
    })
})
