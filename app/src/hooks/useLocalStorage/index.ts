import { useCallback, useEffect, useState } from 'react'

const parseJSON = (value: string | null) => {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
}

const isServer = typeof window === 'undefined'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState(() => initialValue)

    const readValue = useCallback(() => {
        if (isServer) {
            return initialValue
        }

        try {
            const value = window.localStorage.getItem(key)
            return value ? (parseJSON(value) as T) : initialValue
        } catch (error) {
            // eslint-disable-next-line no-console
            console.warn(`Error reading local storage key "${key}": ${error}`)
        }
    }, [initialValue, key])

    useEffect(() => {
        if (!isServer) {
            setStoredValue(readValue() as T)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setValue = useCallback(
        (value: T) => {
            if (isServer) {
                // eslint-disable-next-line no-console
                console.warn(
                    `Can't set localStorage key "${key}". Environment is not a client.`,
                )
                return
            }

            try {
                const newValue =
                    value instanceof Function ? value(storedValue) : value
                window.localStorage.setItem(key, JSON.stringify(newValue))
                setStoredValue(newValue)
            } catch (error) {
                // eslint-disable-next-line no-console
                console.warn(
                    `Error setting local storage key "${key}": ${error}`,
                )
            }
        },
        [key, storedValue],
    )

    return [storedValue, setValue] as const
}
