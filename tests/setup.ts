/* eslint-disable @typescript-eslint/no-namespace */
import matchers, {
    type TestingLibraryMatchers,
} from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'

declare global {
    namespace Vi {
        interface JestAssertion<T = any>
            extends jest.Matchers<void, T>,
                TestingLibraryMatchers<T, void> {}
    }
}

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup()
})
