import { Tooltip, type TooltipPosition } from '../../../Tooltip'

import {
    ErrorContainer,
    IconContainer,
    MessageContainer,
    ValidationBorder,
} from './TiledInputValidation.styles'
import ExclamationIcon from './assets/exclamation.svg'

type TiledInputValidation = {
    error?: string
    showValidationMessage?: boolean
    defaultPosition?: TooltipPosition
    id?: string
}

export const TiledInputValidation: React.FC<
    React.PropsWithChildren<TiledInputValidation>
> = ({
    children,
    id,
    error,
    defaultPosition = 'bottom-left',
    showValidationMessage = false,
}) => {
    return (
        <Tooltip
            defaultPosition={defaultPosition}
            shouldShow={!!error && showValidationMessage}
        >
            <Tooltip.Content>
                <MessageContainer id={id}>
                    <IconContainer role="presentation">
                        <ExclamationIcon />
                    </IconContainer>
                    <ErrorContainer>{error}</ErrorContainer>
                </MessageContainer>
            </Tooltip.Content>
            <ValidationBorder $valid={!error}>{children}</ValidationBorder>
        </Tooltip>
    )
}
