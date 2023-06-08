import { useMemo } from 'react'

import Tile from '../Tile/StaticTile'
import { TileGroup } from '../TileBoard.styles'
import { getVariant } from '../util'

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
                return (
                    <Tile
                        wordLength={correctWord.length}
                        animationDelayMultiplier={index}
                        key={`${letter}-${index}`}
                        variant={tileVariant}
                    >
                        {letter}
                    </Tile>
                )
            })
    }, [word, correctWord])

    return (
        <TileGroup role="list" aria-label={word}>
            {tiledWord}
        </TileGroup>
    )
}

export default TiledAttempt
