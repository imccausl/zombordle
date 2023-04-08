import { render, screen } from '@testing-library/react'

import { Tooltip, type TooltipProps } from '.'

const defaultProps: TooltipProps = {
    isShowing: false,
}

const renderComponent = (props: Partial<TooltipProps> = {}) => {
    render(
        <Tooltip {...defaultProps} {...props}>
            <Tooltip.Content>Testing Tooltip</Tooltip.Content>
        </Tooltip>,
    )
}

describe('<Tooltip />', () => {
    it('should show the tooltip when isShowing is true', () => {
        renderComponent({ isShowing: true })

        expect(screen.getByText(/Testing Tooltip/i)).toBeInTheDocument()
    })

    it('should not show the tooltip when isShowing is false', () => {
        renderComponent({ isShowing: false })

        expect(screen.queryByText(/Testing Tooltip/i)).not.toBeInTheDocument()
    })
})
