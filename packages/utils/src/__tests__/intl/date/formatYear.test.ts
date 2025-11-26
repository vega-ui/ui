import { describe, it, expect } from 'vitest';
import { formatYear } from '../../../intl';

describe('formatYear', () => {
  it('formats year in default locale (en-US) with numeric format', () => {
    expect(formatYear(2025)).toBe('2025');
  });
  
  it('formats year using 2-digit format', () => {
    expect(formatYear(2025, 'en-US', '2-digit')).toBe('25');
    expect(formatYear(1999, 'en-US', '2-digit')).toBe('99');
  });
  
  it('formats year using a different locale', () => {
    expect(formatYear(2025, 'ru-RU')).toBe('2025');
  });
  
  it('formats year using an array of locales', () => {
    const result = formatYear(2024, ['fr-FR', 'en-US']);
    expect(result).toBe('2024');
  });
  
  it('handles negative years (BC dates)', () => {
    const result = formatYear(-44);
    expect(typeof result).toBe('string');
  });
  
  it('formats year with Date rollover safety', () => {
    const result = formatYear(10000);
    expect(typeof result).toBe('string');
  });
  
  it('always returns a string', () => {
    expect(typeof formatYear(0)).toBe('string');
  });
});
