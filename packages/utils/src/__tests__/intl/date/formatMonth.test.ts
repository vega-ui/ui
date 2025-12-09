import { describe, it, expect } from 'vitest';
import { formatMonth } from '../../../intl';

describe('formatMonth', () => {
  it('formats month in default locale (en-US) with numeric format', () => {
    expect(formatMonth(0)).toBe('January');
    expect(formatMonth(11)).toBe('December');
  });
  
  it('formats month using a specific locale', () => {
    const result = formatMonth(5, 'ru-RU');
    expect(result).toBe('июнь');
  });
  
  it('formats month using 2-digit format', () => {
    expect(formatMonth(0, 'en-US', '2-digit')).toBe('01');
    expect(formatMonth(9, 'en-US', '2-digit')).toBe('10');
  });
  
  it('formats month using long format', () => {
    const result = formatMonth(0, 'en-US', 'long');
    expect(result).toBe('January');
  });
  
  it('formats month using short format', () => {
    const result = formatMonth(0, 'en-US', 'short');
    expect(result).toBe('Jan');
  });
  
  it('supports an array of locales', () => {
    const result = formatMonth(3, ['fr-FR', 'en-US'], 'long');
    expect(result).toBe('avril');
  });
  
  it('clamps overflow months via JavaScript Date rollover', () => {
    expect(formatMonth(13)).toBe('February');
  });
  
  it('returns a string for any valid month', () => {
    const formatted = formatMonth(5);
    expect(typeof formatted).toBe('string');
  });
});
