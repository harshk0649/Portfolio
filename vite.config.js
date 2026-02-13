import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'redirect-to-portfolio',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.originalUrl === '/') {
            res.statusCode = 302;
            res.setHeader('Location', '/Portfolio/');
            res.end();
          } else {
            next();
          }
        });
      }
    }
  ],
  base: '/Portfolio/',
  server: {
    open: '/Portfolio/'
  },
  build: {
    outDir: 'docs'
  }
})
