import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allows access inside Docker
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // Fixes hot reload issues in Docker
    },
  },
});
