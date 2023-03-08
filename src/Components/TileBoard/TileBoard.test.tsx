import { render as renderComponent, screen } from '@testing-library/react'

import TileBoard, { type TileBoardProps } from '.'

const defaultProps: TileBoardProps = {
    guess: '',
    guesses: [],
    correctWord: 'foundation',
}

const render = (props: Partial<TileBoardProps> = {}) =>
    renderComponent(<TileBoard {...defaultProps} {...props} />)

describe('TileBoard', () => {
    it('renders blank squares corresponding to the length of the correct word', () => {
        const { debug } = render()
        debug()
        const allBlankTiles = screen.getAllByRole('listitem')

        expect(allBlankTiles).toHaveLength(10)
    })
})
