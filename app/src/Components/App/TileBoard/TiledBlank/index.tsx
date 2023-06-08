import { useMemo } from 'react'

import Tile from '../Tile/StaticTile'
import { TileGroup } from '../TileBoard.styles'

type TiledBlankProps = {
    correctWordLength: number
}

const TiledBlank: React.FC<TiledBlankProps> = ({ correctWordLength }) => {
    const tiledBlank = useMemo(() => {
        return ' '
            .repeat(correctWordLength || 0)
            .split('')
            .map((blank: string, index: number) => {
                return (
                    <Tile
                        wordLength={correctWordLength}
                        key={index}
                        variant="default"
                    >
                        {blank}
                    </Tile>
                )
            })
    }, [correctWordLength])

    return <TileGroup role="list">{tiledBlank}</TileGroup>
}

export default TiledBlank
