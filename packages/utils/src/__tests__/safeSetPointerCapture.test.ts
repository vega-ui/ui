import { describe, expect, it } from 'vitest';
import { safeSetPointerCapture } from '../safeSetPointerCapture';

describe('safeSetPointerCapture', () => {
  it('does not throw for invalid pointerId', () => {
    const el = {
      setPointerCapture: () => {
        throw new Error('Invalid pointer id');
      },
      hasPointerCapture: () => false,
    } as unknown as HTMLElement;
    
    expect(() => {
      safeSetPointerCapture(el, 999);
    }).not.toThrow();
  });
  
  it('returns false when setPointerCapture is not supported', () => {
    const el = {} as HTMLElement;
    
    expect(safeSetPointerCapture(el, 1)).toBe(false);
  });
});