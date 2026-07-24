import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // Ruta base de tu repositorio en GitHub Pages
  base: '/Pijamas/',
  plugins: [
    react(),
    tsconfigPaths(),
  ],
})