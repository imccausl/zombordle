import { render, screen } from '@testing-library/react'

import TiledAttempt from '.'

describe('TiledAttempt', () => {
    it('renders a word as separate tiles', () => {
        render(<TiledAttempt word="test" correctWord="best" />)

        screen.getByText(
            (content, element) =>
                !element?.getAttribute('aria-hidden') &&
                content.startsWith('e'),
        )
        screen.getByText(
            (content, element) =>
                !element?.getAttribute('aria-hidden') &&
                content.startsWith('s'),
        )

        const repeatedConsonants = screen.getAllByText(
            (content, element) =>
                !element?.getAttribute('aria-hidden') &&
                content.startsWith('t'),
        )
        expect(repeatedConsonants).toHaveLength(2)
    })
})
