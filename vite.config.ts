// @ts-nocheck
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function serveTemplateIndexPlugin(): Plugin {
  return {
    name: 'serve-template-index',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/templates/')) {
          const cleanUrl = req.url.split('?')[0].split('#')[0];
          
          // Check if cleanUrl is a folder in workspace
          const relativePath = cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl;
          const fullPath = path.join(__dirname, relativePath);
          
          if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
            if (!cleanUrl.endsWith('/')) {
              // Redirect to url with trailing slash so browser resolves relative assets correctly
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

export default defineConfig(() => {
  return {
    plugins: [serveTemplateIndexPlugin(), react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
