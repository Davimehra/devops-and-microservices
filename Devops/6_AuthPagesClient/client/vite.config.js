import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://dev.bhojnalaya.shop",
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    host: true,
    port: 3000
  },

})
