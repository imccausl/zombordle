/// <reference types="vitest">
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        cache: {
            dir: '.vitest',
        },
        environment: 'jsdom',
        globals: true,
        setupFiles: '../tests/setup.ts',
    },
})
