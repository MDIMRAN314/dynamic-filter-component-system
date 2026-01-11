import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // <--- Matches tsconfig paths
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Security: Hide source code in production (smaller bundle, harder to reverse engineer)
    manifest: true,
    target: 'esnext',
    cssCodeSplit: false,
    // chunkSizeWarningLimit: 500,
    // reportCompressedSize: false,
    // watch: {
    //   exclude: ['**/node_modules/**', '**/dist/**'],
    // },
    // Chunk Splitting Strategy
    // This separates heavy libraries (like React/MUI).
    // If we update the App code, users don't have to re-download the heavy React code.
    // rollupOptions: {
    //   output: {
    //     manualChunks: (id) => {
    //       if (id.includes('node_modules')) {
    //         if (id.includes('@mui')) return 'vendor-mui';
    //         if (id.includes('react')) return 'vendor-react';
    //         if (id.includes('date-fns')) return 'vendor-utils';
    //         if (id.includes('lucide')) return 'vendor-icons';
    //         return 'vendor'; // Fallback for other dependencies
    //       }
    //     },
    //   },
    // },
  },
  server: {
    port: 5000,
    strictPort: true,
  },
  // Minification Options (esbuild is default and fastest)
  // Used to remove console.log from production automatically
  // esbuild: {
  //   drop: ['console', 'debugger'],
  // },
});
