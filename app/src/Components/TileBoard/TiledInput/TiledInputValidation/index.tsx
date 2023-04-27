import { Tooltip, type TooltipPosition } from '../../../Tooltip'

import { ValidationBorder } from './TiledInputValidation.styles'
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
                <div id={id}>
                    <ExclamationIcon />
                    {error}
                </div>
            </Tooltip.Content>
            <ValidationBorder $valid={!error}>{children}</ValidationBorder>
        </Tooltip>
    )
}
