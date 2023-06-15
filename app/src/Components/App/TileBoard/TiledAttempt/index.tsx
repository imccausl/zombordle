import { useMemo } from 'react'

import Tile from '../Tile/StaticTile'
import { TileGroup } from '../TileBoard.styles'
import { VariantToLabel, getVariants } from '../util'

type TilesProps = {
    word: string
    correctWord: string
}

const TiledAttempt: React.FC<TilesProps> = ({ word, correctWord }) => {
    const tiledWord = useMemo(() => {
        const variantMap = getVariants({ correctWord, word })
        return word
            .toLowerCase()
            .split('')
            .map((letter: string, index: number) => {
                const ariaLabel = `${letter} (${
                    VariantToLabel[variantMap[index]]
                })`

                return (
                    <Tile
                        wordLength={correctWord.length}
                        animationDelayMultiplier={index}
                        key={`${letter}-${index}`}
                        variant={variantMap[index]}
                        aria-label={ariaLabel}
                    >
                        {letter}
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
            aria-live="assertive"
        >
            {tiledWord}
        </TileGroup>
    )
}

export default TiledAttempt
