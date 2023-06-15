import { render, screen } from '@testing-library/react'

import { VariantBorder, VariantColor } from './StaticTile.styles'

import StaticTile from '.'

describe('StaticTile', () => {
    it('renders default variant with a letter', () => {
        render(<StaticTile>A</StaticTile>)

        const tileElement = screen.getByRole('listitem')

        expect(tileElement).toBeInTheDocument()
        expect(tileElement).toHaveStyle(
            `background-color: ${VariantColor.default}`,
        )
        expect(tileElement).toHaveStyle(
            `border: 2px solid ${VariantBorder.full}`,
        )
    })

    it('renders default empty variant', () => {
        render(<StaticTile> </StaticTile>)

        const tileElement = screen.getByRole('listitem')

        expect(tileElement).toBeInTheDocument()
        expect(tileElement).toHaveStyle(
            `background-color: ${VariantColor.default}`,
        )
        expect(tileElement).toHaveStyle(
            `border-color: ${VariantBorder.default}`,
        )
    })
})
