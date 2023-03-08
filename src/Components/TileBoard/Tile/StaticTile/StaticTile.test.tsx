import { render, screen } from '@testing-library/react'

import { VariantBorder, VariantColor } from './StaticTile.styles'

import StaticTile from '.'

const variantColors = Object.keys(VariantColor)
describe('StaticTile', () => {
    it('renders default variant', () => {
        render(<StaticTile>A</StaticTile>)

        const tileElement = screen.getByRole('listitem')

        expect(tileElement).toBeInTheDocument()
        expect(tileElement).toHaveStyle(
            `background-color: ${VariantColor.default}`,
        )
        expect(tileElement).toHaveStyle(
            `border-color: ${VariantBorder.default}`,
        )
    })

    describe('Variants', () => {
        it.each([
            ...variantColors.map((color) => [
                color,
                VariantColor[color as keyof typeof VariantColor],
                VariantBorder[color as keyof typeof VariantColor],
            ]),
        ])(
            'renders with correct background and border colors for variant %s',
            (
                variantColorName,
                expectedBackgroundColor,
                expectedBorderColor,
            ) => {
                render(
                    <StaticTile
                        variant={variantColorName as keyof typeof VariantColor}
                    >
                        A
                    </StaticTile>,
                )

                const tileElement = screen.getByRole('listitem')

                expect(tileElement).toHaveStyle(
                    `background-color: ${expectedBackgroundColor}`,
                )
                expect(tileElement).toHaveStyle(
                    `border-color: ${expectedBorderColor}`,
                )
            },
        )
    })
})
