import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/jogo-de-ingles/',    // <— aqui
  server: {
    fs: {
      strict: false
    }
  }
})