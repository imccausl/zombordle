import { useMemo } from 'react'

import Tile from '../Tile/StaticTile'
import { VisuallyHidden } from '../Tile/StaticTile/StaticTile.styles'
import { TileGroup } from '../TileBoard.styles'
import { VariantToLabel, getVariant } from '../util'

type TilesProps = {
    word: string
    correctWord: string
}

const TiledAttempt: React.FC<TilesProps> = ({ word, correctWord }) => {
    const tiledWord = useMemo(() => {
        return word
            .toLowerCase()
            .split('')
            .map((letter: string, index: number) => {
                const tileVariant = getVariant({ correctWord, letter, index })
                const correctnessStatus = ` (${VariantToLabel[tileVariant]})`

                return (
                    <Tile
                        wordLength={correctWord.length}
                        animationDelayMultiplier={index}
                        key={`${letter}-${index}`}
                        variant={tileVariant}
                    >
                        <p>
                            {letter}
                            <VisuallyHidden as="span">
                                {correctnessStatus}
                            </VisuallyHidden>
                        </p>
                    </Tile>
                )
            })
    }, [word, correctWord])

    return (
        <TileGroup
            role="list"
            aria-label={`${word} (${
                word.toLowerCase() === correctWord.toLowerCase()
                    ? 'correct'
                    : 'incorrect'
            })`}
        >
            {tiledWord}
        </TileGroup>
    )
}

export default TiledAttempt
