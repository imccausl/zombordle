import { render, screen } from '@testing-library/react'

import { Position } from './Revealer.constants'

import { Revealer, type RevealerProps, getContainerPosition } from '.'

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

// TODO: make these tests better
describe('<ContentRevealer />', () => {
    it('should show the Revealer when isShowing is true', () => {
        renderComponent({ isShowing: true })

        expect(screen.getByText(/Testing Revealer/i)).toBeInTheDocument()
    })

    it('should not show the Revealer when isShowing is false', () => {
        renderComponent({ isShowing: false })

        expect(screen.queryByText(/Testing Revealer/i)).not.toBeInTheDocument()
    })

    describe('getContainerPosition', () => {
        afterEach(() => {
            vi.resetAllMocks()
        })

        describe('bottom default positions', () => {
            it.each`
                defaultPosition          | containerBounds                                 | expectedPosition
                ${Position.bottomLeft}   | ${{ left: 0, bottom: 0, right: 1025, top: 0 }}  | ${Position.bottomCenter}
                ${Position.bottomCenter} | ${{ left: 0, bottom: 0, right: 1025, top: 0 }}  | ${Position.bottomRight}
                ${Position.bottomRight}  | ${{ left: 0, bottom: 0, right: 1025, top: 0 }}  | ${Position.bottomLeft}
                ${Position.bottomLeft}   | ${{ left: -2, bottom: 0, right: 0, top: 0 }}    | ${Position.bottomCenter}
                ${Position.bottomCenter} | ${{ left: -2, bottom: 0, right: 0, top: 0 }}    | ${Position.bottomRight}
                ${Position.bottomRight}  | ${{ left: -2, bottom: 0, right: 0, top: 0 }}    | ${Position.bottomLeft}
                ${Position.bottomLeft}   | ${{ left: 0, bottom: 1025, right: 0, top: 0 }}  | ${Position.topLeft}
                ${Position.bottomCenter} | ${{ left: 0, bottom: 1025, right: 0, top: 0 }}  | ${Position.topCenter}
                ${Position.bottomRight}  | ${{ left: 0, bottom: 1025, right: 0, top: 0 }}  | ${Position.topRight}
                ${Position.bottomLeft}   | ${{ left: -2, bottom: 1025, right: 0, top: 0 }} | ${Position.topCenter}
                ${Position.bottomCenter} | ${{ left: -2, bottom: 1025, right: 0, top: 0 }} | ${Position.topRight}
                ${Position.bottomRight}  | ${{ left: -2, bottom: 1025, right: 0, top: 0 }} | ${Position.topLeft}
            `(
                'returns $expectedPosition when defaultPosition is $defaultPosition and ...',
                ({ defaultPosition, containerBounds, expectedPosition }) => {
                    const containerElement = document.createElement('div')
                    document.body.appendChild(containerElement)
                    Element.prototype.getBoundingClientRect = vi.fn(
                        () => containerBounds,
                    )
                    const position = getContainerPosition(
                        containerElement,
                        defaultPosition,
                    )

                    expect(position).toEqual(expectedPosition)
                },
            )
        })

        describe('top default positions', () => {
            it.each`
                defaultPosition       | containerBounds                                | expectedPosition
                ${Position.topLeft}   | ${{ left: 0, bottom: 0, right: 1025, top: 0 }} | ${Position.topCenter}
                ${Position.topCenter} | ${{ left: 0, bottom: 0, right: 1025, top: 0 }} | ${Position.topRight}
                ${Position.topRight}  | ${{ left: 0, bottom: 0, right: 1025, top: 0 }} | ${Position.topLeft}
                ${Position.topLeft}   | ${{ left: -2, bottom: 0, right: 0, top: 0 }}   | ${Position.topCenter}
                ${Position.topCenter} | ${{ left: -2, bottom: 0, right: 0, top: 0 }}   | ${Position.topRight}
                ${Position.topRight}  | ${{ left: -2, bottom: 0, right: 0, top: 0 }}   | ${Position.topLeft}
            `(
                'returns $expectedPosition when defaultPosition is $defaultPosition and ...',
                ({ defaultPosition, containerBounds, expectedPosition }) => {
                    const containerElement = document.createElement('div')
                    document.body.appendChild(containerElement)
                    Element.prototype.getBoundingClientRect = vi.fn(
                        () => containerBounds,
                    )
                    const position = getContainerPosition(
                        containerElement,
                        defaultPosition,
                    )

                    expect(position).toEqual(expectedPosition)
                },
            )
        })
    })
})
