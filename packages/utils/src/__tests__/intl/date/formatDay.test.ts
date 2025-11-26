import { describe, it, expect } from 'vitest';
import { formatDay } from '../../../intl';

describe('formatDay', () => {
  it('formats day in default locale (en-US)', () => {
    expect(formatDay(1, 0, 2025)).toBe('1');
    expect(formatDay(15, 5, 2025)).toBe('15');
  });
  
  it('formats day using a specific locale', () => {
    const result = formatDay(7, 3, 2025, 'ru-RU');
    expect(result).toContain('7');
  });
  
  it('formats day using 2-digit format', () => {
    expect(formatDay(3, 0, 2025, 'en-US', '2-digit')).toBe('03');
  });
  
  it('formats day for different months and leap-year dates', () => {
    expect(formatDay(29, 1, 2024, 'en-US')).toBe('29'); // 29 Feb 2024 — leap year
  });
  
  it('handles invalid dates gracefully (e.g., Feb 30)', () => {
    expect(formatDay(30, 1, 2025, 'en-US')).toBe('2');
  });
  
  it('works with locales array', () => {
    const result = formatDay(10, 4, 2025, ['fr-FR', 'en-US']);
    expect(result).toBe('10');
  });
  
  it('returns string for all valid inputs', () => {
    const value = formatDay(12, 11, 2025);
    expect(typeof value).toBe('string');
  });
});