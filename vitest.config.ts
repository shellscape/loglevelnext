import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['test/**/*.ts'],
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      exclude: ['node_modules/', 'dist/', 'test/'],
    },
  },
});