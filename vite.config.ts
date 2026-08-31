// @ts-nocheck
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function serveTemplateIndexPlugin(): Plugin {
  return {
    name: 'serve-template-index',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
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
