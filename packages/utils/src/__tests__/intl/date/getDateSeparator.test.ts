import { describe, it, expect } from 'vitest';
import { getDateSeparator } from '../../../intl';

describe('getDateSeparator', () => {
  it('returns a string', () => {
    expect(typeof getDateSeparator('en-US')).toBe('string');
  });
  
  it('en-US uses "/" as date separator', () => {
    expect(getDateSeparator('en-US')).toBe('/');
  });
  
  it('ru-RU uses "." as date separator', () => {
    expect(getDateSeparator('ru-RU')).toBe('.');
  });
  
  it('de-DE uses "." as date separator', () => {
    expect(getDateSeparator('de-DE')).toBe('.');
  });
  
  it('sv-SE uses "-" as date separator', () => {
    expect(getDateSeparator('sv-SE')).toBe('-');
  });
  
  it('returns a non-empty separator for undefined locale', () => {
    const sep = getDateSeparator();
    expect(typeof sep).toBe('string');
    expect(sep.length).toBeGreaterThan(0);
  });
  
  it('separator length is usually 1 character', () => {
    const sep = getDateSeparator('en-US');
    expect(sep.length).toBeGreaterThanOrEqual(1);
  });
});