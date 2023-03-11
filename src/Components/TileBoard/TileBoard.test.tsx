import { render as renderComponent, screen } from '@testing-library/react'

import TileBoard, { type TileBoardProps } from '.'

const defaultProps: TileBoardProps = {
    guess: '',
    guesses: [],
    correctWord: 'foundation',
    onChange: () => {},
    onSubmit: () => {},
}

const render = (props: Partial<TileBoardProps> = {}) =>
    renderComponent(<TileBoard {...defaultProps} {...props} />)

describe('TileBoard', () => {
    it('renders tiled input squares corresponding to the length of the correct word', () => {
        render()
        const allBlankTiles = screen.getAllByRole('textbox')

        expect(allBlankTiles).toHaveLength(10)
    })
})
