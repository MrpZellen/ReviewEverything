import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()], // defines react as our primary framework
  server: { //server config defines express connection for Vite.
    host: '0.0.0.0',  // expose to Docker, removing internal network restrictions.
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3100'  // proxy means that we can define api routes and auto forward to express. 
      // TODO: ensure every api instance starts with /api to forward to express servers and NOT register as a react page to work with Vite properly.
    }
  }
})