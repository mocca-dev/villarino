import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'assets/icons/*.png'],
      manifest: {
        name: 'Horarios - El Villarino 319',
        short_name: 'Horarios 319',
        description: 'Horarios del colectivo El Villarino - línea 319',
        lang: 'es',
        theme_color: '#2d2d44',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'assets/icons/Icon-72.png', sizes: '72x72', type: 'image/png' },
          { src: 'assets/icons/Icon-96.png', sizes: '96x96', type: 'image/png' },
          { src: 'assets/icons/icon-144.png', sizes: '144x144', type: 'image/png' },
          { src: 'assets/icons/Icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'assets/icons/Icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'assets/icons/Icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // `/api/*` is served by the Express function, never from the precache.
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
  build: {
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
