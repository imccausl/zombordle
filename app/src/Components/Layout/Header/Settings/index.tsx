import { StyledLink } from '../Header.styles'

import SettingsIcon from './assets/settings_icon.svg?react'

export const Settings: React.FC = () => {
    return (
        <StyledLink href="/settings" aria-label="Settings">
            <SettingsIcon width="1.5em" height="1.5em" />
        </StyledLink>
    )
}
