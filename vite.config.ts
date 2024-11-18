import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      //Proxy para la API de Spring Boot
      '/api': {
        target: 'http://localhost:8009',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/clinicadental')
      }
      }
    }
})
