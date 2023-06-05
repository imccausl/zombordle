'use client'

import { useCallback, useEffect, useState } from 'react'

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

    const [hasCorrectGuess, setHasCorrectGuess] = useState<boolean>(false)

    useEffect(() => {
        if (guesses?.includes(correctWord)) {
            setHasCorrectGuess(true)
        }
    }, [correctWord, guesses])

    useEffect(() => {
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
            hasCorrectGuess={hasCorrectGuess}
            correctWord={correctWord}
            wordList={wordList}
        />
    )
}

export default App
