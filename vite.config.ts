import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    include: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**', '**/playwright/**'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests',
    mockReset: true,
  },
})
