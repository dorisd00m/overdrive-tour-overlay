import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/overdrive-tour-overlay', // Ganti dengan nama repo
  server: {
    port: 3535
  }
})
