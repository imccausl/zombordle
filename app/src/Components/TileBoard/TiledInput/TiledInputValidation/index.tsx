import { Tooltip } from '../../../Tooltip'

import { ValidationBorder } from './TiledInputValidation.styles'

type TiledInputValidation = {
    error?: string
    showValidationMessage?: boolean
}
export const TiledInputValidation: React.FC<
    React.PropsWithChildren<TiledInputValidation>
> = ({ children, error, showValidationMessage = false }) => {
    return (
        <Tooltip shouldShow={!!error && showValidationMessage}>
            <Tooltip.Content>{error}</Tooltip.Content>
            <ValidationBorder $valid={!error}>{children}</ValidationBorder>
        </Tooltip>
    )
}
