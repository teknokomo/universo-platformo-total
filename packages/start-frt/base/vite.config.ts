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
      // Forward /api/* to start-srv (Total.js backend).
      // The prefix is kept intact: /api/auth/login → http://localhost:4000/api/auth/login
      '/api': {
        target:       'http://localhost:4000',
        changeOrigin: true,
        // No rewrite — start-srv routes are registered under /api/auth/*
      },
    },
  },
  resolve: {
    alias: {
      '@universo-platformo/types':    resolve(__dirname, '../../universo-types/base/src'),
      '@universo-platformo/auth-frt': resolve(__dirname, '../../auth-frt/base/src'),
    },
  },
});
