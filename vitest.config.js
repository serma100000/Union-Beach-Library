import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use happy-dom for faster DOM testing (alternative to jsdom)
    environment: 'happy-dom',

    // Global test utilities
    globals: true,

    // Setup files to run before tests
    setupFiles: ['./tests/setup.js'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.js',
        'dist/',
      ],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },

    // Test file patterns
    include: ['tests/**/*.test.js'],

    // Watch mode
    watch: false,

    // Reporters
    reporter: ['verbose'],

    // Timeout
    testTimeout: 10000,
  },
});
