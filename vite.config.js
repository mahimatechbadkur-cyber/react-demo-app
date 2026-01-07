import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    test: {
    globals: true,
    environment: 'jsdom',
   coverage: {
      provider: 'v8',                     // use built-in provider to avoid external dependency
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
      all: true,
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['src/tests/**', 'node_modules/**', 'public/**'],
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80,
    },
    setupFiles: './src/setupTests.js', // We will create this next
  },
})
