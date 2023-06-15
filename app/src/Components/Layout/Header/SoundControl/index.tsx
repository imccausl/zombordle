import { useCallback, useState } from 'react'

import { StyledIconButton } from '../Header.styles'

import { SoundControlContainer } from './SoundControl.styles'
import { ReactComponent as MuteIcon } from './assets/mute_icon.svg'
import { ReactComponent as SpeakerIcon } from './assets/speaker_icon.svg'

const SoundControlButton: React.FC<{
    isMuted: boolean
    onClick: () => void
}> = ({ isMuted, onClick }) => {
    const ariaLabel = isMuted ? 'Unmute audio' : 'mute audio'

    return (
        <StyledIconButton aria-label={ariaLabel} onClick={onClick}>
            {isMuted ? (
                <MuteIcon aria-hidden="true" />
            ) : (
                <SpeakerIcon aria-hidden="true" />
            )}
        </StyledIconButton>
    )
}

export const SoundControl: React.FC = () => {
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
