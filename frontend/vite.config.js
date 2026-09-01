import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function serveTemplateIndexPlugin() {
  return {
    name: 'serve-template-index',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/templates/')) {
          const cleanUrl = req.url.split('?')[0].split('#')[0];
          
          const relativePath = cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl;
          const fullPath = path.join(__dirname, 'public', relativePath);
          
          if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
            if (!cleanUrl.endsWith('/')) {
              const queryAndHash = req.url.slice(cleanUrl.length);
              res.writeHead(301, { Location: cleanUrl + '/' + queryAndHash });
              return res.end();
            }
            req.url = req.url.replace(cleanUrl, cleanUrl + 'index.html');
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [serveTemplateIndexPlugin(), react()],
});
