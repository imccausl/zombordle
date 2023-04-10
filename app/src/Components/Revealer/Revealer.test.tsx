import { render, screen } from '@testing-library/react'

import { type RevealerProps, Tooltip } from '.'

const defaultProps: RevealerProps = {
    isShowing: false,
}

const renderComponent = (props: Partial<RevealerProps> = {}) => {
    render(
        <Tooltip {...defaultProps} {...props}>
            <Tooltip.Content>Testing Tooltip</Tooltip.Content>
        </Tooltip>,
    )
}

describe('<ContentRevealer />', () => {
    it('should show the tooltip when isShowing is true', () => {
        renderComponent({ isShowing: true })

        expect(screen.getByText(/Testing Tooltip/i)).toBeInTheDocument()
    })

    it('should not show the tooltip when isShowing is false', () => {
        renderComponent({ isShowing: false })

        expect(screen.queryByText(/Testing Tooltip/i)).not.toBeInTheDocument()
    })
})
