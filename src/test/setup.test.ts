import { describe, it, expect } from 'vitest';

describe('Project Setup', () => {
  it('should have basic testing infrastructure working', () => {
    expect(true).toBe(true);
  });

  it('should be able to import Zod', async () => {
    const { z } = await import('zod');
    expect(z).toBeDefined();
    expect(typeof z.string).toBe('function');
  });

  it('should be able to import fast-check', async () => {
    const fc = await import('fast-check');
    expect(fc.default).toBeDefined();
    expect(typeof fc.default.string).toBe('function');
  });
});