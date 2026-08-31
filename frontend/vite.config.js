import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

function serveTemplateIndexPlugin() {
  return {
    name: 'serve-template-index',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/templates/')) {
          const cleanUrl = req.url.split('?')[0].split('#')[0];
          if (cleanUrl.endsWith('/')) {
            req.url = req.url.replace(cleanUrl, cleanUrl + 'index.html');
          } else if (!path.extname(cleanUrl)) {
            req.url = req.url.replace(cleanUrl, cleanUrl + '/index.html');
          }
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [serveTemplateIndexPlugin(), react()],
})

