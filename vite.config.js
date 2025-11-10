import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Base public path
  base: '/Union-Beach-Library/',

  // Development server configuration
  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    // Minify for production
    minify: 'terser',
    // Target modern browsers as per requirements
    target: 'es2015',
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          vendor: ['axe-core'],
        },
      },
    },
  },

  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
  },

  // CSS configuration
  css: {
    devSourcemap: true,
  },

  // Plugin configuration (can be extended later)
  plugins: [],

  // Dependency optimization
  optimizeDeps: {
    include: ['axe-core'],
  },
});
