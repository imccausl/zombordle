import { useCallback, useState } from 'react'

import {
    SoundControlContainer,
    StyledH1,
    StyledHeader,
    StyledIconButton,
} from './Header.styles'
import { ReactComponent as MuteIcon } from './assets/mute_icon.svg'
import { ReactComponent as SpeakerIcon } from './assets/speaker_icon.svg'

const SoundControlButton: React.FC<{
    isMuted: boolean
    onClick: () => void
}> = ({ isMuted, onClick }) => {
    const ariaLabel = isMuted ? 'Unmute audio' : 'mute audio'

    return (
        <StyledIconButton aria-label={ariaLabel} onClick={onClick}>
            {isMuted ? <MuteIcon /> : <SpeakerIcon />}
        </StyledIconButton>
    )
}
const SoundControl: React.FC = () => {
    const [isMuted, setIsMuted] = useState(true)
    const handleMuteToggle = useCallback(() => {
        setIsMuted(!isMuted)
    }, [isMuted])

    return (
        <SoundControlContainer>
            <SoundControlButton isMuted={isMuted} onClick={handleMuteToggle} />
            {/* Muted audio would not autoplay in chrome with the audio tag, but
             * the video tag autoplays correctly 🤷‍♂️.
             */}
            <video
                height="0"
                width="0"
                playsInline
                autoPlay={true}
                loop
                muted={isMuted}
            >
                <source src="/zombo_theme.mp3" />
            </video>
        </SoundControlContainer>
    )
}

const Header: React.FC = () => {
    return (
        <StyledHeader>
            <div style={{ flex: '1 1 0' }}></div>
            <StyledH1>Zombordle</StyledH1>
            <SoundControl />
        </StyledHeader>
    )
}

export { Header }
