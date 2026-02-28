import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, '..'),
  build: {
    outDir: resolve(__dirname, '../dist'),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      '/auth': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@universo-platformo/types': resolve(__dirname, '../../universo-types/base/src'),
      '@universo-platformo/auth-frt': resolve(__dirname, '../../auth-frt/base/src'),
    },
  },
});
