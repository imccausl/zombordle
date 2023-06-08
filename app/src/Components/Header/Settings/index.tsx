import { StyledIconButton } from '../Header.styles'

import { ReactComponent as SettingsIcon } from './assets/settings_icon.svg'

export const Settings: React.FC = () => {
    return (
        <StyledIconButton>
            <SettingsIcon />
        </StyledIconButton>
    )
}
