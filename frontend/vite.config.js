import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The built site is served from the repo root by GitHub Pages, next to the
// pre-existing /assets folder, so all bundle files go under /static to avoid
// colliding with it.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'static/[name]-[hash].js',
        chunkFileNames: 'static/[name]-[hash].js',
        assetFileNames: 'static/[name]-[hash][extname]',
      },
    },
  },
});
