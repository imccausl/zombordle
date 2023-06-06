import { render as renderComponent, screen } from '@testing-library/react'
import { FormProvider } from 'formula-one'

import TileBoard, { type TileBoardProps } from '.'

const defaultProps: TileBoardProps = {
    guesses: [],
    correctWord: 'foundation',
    hasCorrectGuess: false,
}

const render = (props: Partial<TileBoardProps> = {}) =>
    renderComponent(
        <FormProvider onSubmit={() => {}} initialValues={{ field1: '' }}>
            <TileBoard {...defaultProps} {...props} />
        </FormProvider>,
    )

describe('TileBoard', () => {
    it('renders tiled input squares corresponding to the length of the correct word', () => {
        render()
        const allBlankTiles = screen.getAllByRole('textbox')

        expect(allBlankTiles).toHaveLength(10)
    })
})
