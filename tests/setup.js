/**
 * Test setup file
 * Configures testing environment and global utilities
 */

import { expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';

// Extend Vitest's expect with jest-axe matchers for accessibility testing
expect.extend({ toHaveNoViolations });

// Mock console methods to reduce noise in tests (optional)
global.console = {
  ...console,
  // Uncomment to suppress console output during tests
  // error: vi.fn(),
  // warn: vi.fn(),
  // log: vi.fn(),
};
