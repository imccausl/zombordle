import { render, screen } from '@testing-library/react'

import { Revealer, type RevealerProps } from '.'

const defaultProps: RevealerProps = {
    isShowing: false,
}

const renderComponent = (props: Partial<RevealerProps> = {}) => {
    render(
        <Revealer {...defaultProps} {...props}>
            <Revealer.Content>Testing Revealer</Revealer.Content>
        </Revealer>,
    )
}

describe('<ContentRevealer />', () => {
    it('should show the Revealer when isShowing is true', () => {
        renderComponent({ isShowing: true })

        expect(screen.getByText(/Testing Revealer/i)).toBeInTheDocument()
    })

    it('should not show the Revealer when isShowing is false', () => {
        renderComponent({ isShowing: false })

        expect(screen.queryByText(/Testing Revealer/i)).not.toBeInTheDocument()
    })
})
