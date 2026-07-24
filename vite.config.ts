import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  // En 'serve' (npm run dev) usa '/', en 'build' (npm run build) usa '/Pijamas/'
  base: command === 'serve' ? '/' : '/Pijamas/',
  plugins: [
    tailwindcss(),
    react(),
    tsconfigPaths(),
  ],
  build: {
    cssMinify: 'esbuild',
  },
}))