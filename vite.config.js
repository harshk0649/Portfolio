import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // Add this line - should match your repository name
  build: {
    outDir: 'docs'
  }
})
x