import Link from 'next/link'

import { ActionContainer, StyledH1, StyledHeader } from './Header.styles'
import { Settings } from './Settings'
import { SoundControl } from './SoundControl'
import { Stats } from './Stats'

const Header: React.FC = () => {
    return (
        <StyledHeader>
            <div style={{ flex: '1 1 0' }}></div>
            <StyledH1>
                <Link href="/">Zombordle</Link>
            </StyledH1>
            <ActionContainer>
                <SoundControl />
                <Stats />
                <Settings />
            </ActionContainer>
        </StyledHeader>
    )
}

export { Header }
