'use client'

import { useCallback, useEffect } from 'react'

import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useWord } from '../../hooks/useWord'
import { useWordList } from '../../hooks/useWordList'
import TileBoard from '../TileBoard'

const App: React.FC = () => {
    const correctWord = useWord()
    const wordList = useWordList()
    const [guesses, setGuesses] = useLocalStorage<string[]>(
        'zombordle_guesses',
        [],
    )
    const [gameStart, setGameStart] = useLocalStorage<string | null>(
        'zombordle_started',
        null,
    )
    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }

        const today = new Date().toDateString()
        if (gameStart && today !== gameStart) {
            try {
                setGuesses([])
                setGameStart(null)
            } catch {
                // do nothing
            }
        }
    }, [gameStart, guesses, setGameStart, setGuesses])

    const handleOnSubmit = useCallback(
        (value: string) => {
            if (!gameStart) {
                setGameStart(new Date().toDateString())
            }
            setGuesses([...guesses, value])
        },
        [gameStart, guesses, setGameStart, setGuesses],
    )

    return (
        <TileBoard
            onSubmit={handleOnSubmit}
            guesses={guesses}
            correctWord={correctWord}
            wordList={wordList}
        />
    )
}

export default App
