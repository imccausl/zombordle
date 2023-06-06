import { Tooltip, type TooltipPosition } from '../../../Tooltip'

import {
    ErrorContainer,
    IconContainer,
    MessageContainer,
    ValidationBorder,
    type VariantBorder,
} from './TiledInputValidation.styles'
import { ReactComponent as ExclamationIcon } from './assets/exclamation.svg'

type TiledInputValidation = {
    error?: string
    showValidationMessage?: boolean
    defaultPosition?: TooltipPosition
    id?: string
    variant?: VariantBorder
}

export const TiledInputValidation: React.FC<
    React.PropsWithChildren<TiledInputValidation>
> = ({
    children,
    id,
    error,
    defaultPosition = 'bottom-left',
    showValidationMessage = false,
    variant = 'default',
}) => {
    return (
        <Tooltip
            defaultPosition={defaultPosition}
            shouldShow={!!error && showValidationMessage}
        >
            <Tooltip.Content>
                <MessageContainer id={id}>
                    <IconContainer aria-hidden="true">
                        <ExclamationIcon />
                    </IconContainer>
                    <ErrorContainer>{error}</ErrorContainer>
                </MessageContainer>
            </Tooltip.Content>
            <ValidationBorder $variant={variant}>{children}</ValidationBorder>
        </Tooltip>
    )
}
