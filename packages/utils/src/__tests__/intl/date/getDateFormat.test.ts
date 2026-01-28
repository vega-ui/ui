import { describe, it, expect } from 'vitest';
import { getDateFormat } from '../../../intl';

describe('getDateFormat', () => {
  it('returns a non-empty string', () => {
    const fmt = getDateFormat('en-US');
    expect(typeof fmt).toBe('string');
    expect(fmt.length).toBeGreaterThan(0);
  });
  
  it('contains DD, MM, YYYY tokens', () => {
    const fmt = getDateFormat('en-US');
    expect(fmt).toContain('DD');
    expect(fmt).toContain('MM');
    expect(fmt).toContain('YYYY');
  });
  
  it('does not contain numeric date parts from the sample date', () => {
    const fmt = getDateFormat('en-US');
    expect(fmt).not.toContain('1970');
    expect(fmt).not.toContain('02');
    expect(fmt).not.toContain('2');
    expect(fmt).not.toContain('01');
    expect(fmt).not.toContain('1');
  });
  
  it('en-US is month/day/year order', () => {
    const fmt = getDateFormat('en-US');
    expect(fmt).toMatch(/^MM.*DD.*YYYY$/);
    expect(fmt.indexOf('MM')).toBeLessThan(fmt.indexOf('DD'));
    expect(fmt.indexOf('DD')).toBeLessThan(fmt.indexOf('YYYY'));
  });
  
  it('en-GB is day/month/year order', () => {
    const fmt = getDateFormat('en-GB');
    expect(fmt).toMatch(/^DD.*MM.*YYYY$/);
    expect(fmt.indexOf('DD')).toBeLessThan(fmt.indexOf('MM'));
    expect(fmt.indexOf('MM')).toBeLessThan(fmt.indexOf('YYYY'));
  });
  
  it('ru-RU is day.month.year order', () => {
    const fmt = getDateFormat('ru-RU');
    expect(fmt).toMatch(/^DD.*MM.*YYYY$/);
    expect(fmt).toContain('.');
    expect(fmt.indexOf('DD')).toBeLessThan(fmt.indexOf('MM'));
    expect(fmt.indexOf('MM')).toBeLessThan(fmt.indexOf('YYYY'));
  });
  
  it('de-DE is day.month.year order', () => {
    const fmt = getDateFormat('de-DE');
    expect(fmt).toMatch(/^DD.*MM.*YYYY$/);
    expect(fmt).toContain('.');
    expect(fmt.indexOf('DD')).toBeLessThan(fmt.indexOf('MM'));
    expect(fmt.indexOf('MM')).toBeLessThan(fmt.indexOf('YYYY'));
  });
  
  it('ja-JP is year/month/day order', () => {
    const fmt = getDateFormat('ja-JP');
    expect(fmt).toMatch(/^YYYY.*MM.*DD$/);
    expect(fmt.indexOf('YYYY')).toBeLessThan(fmt.indexOf('MM'));
    expect(fmt.indexOf('MM')).toBeLessThan(fmt.indexOf('DD'));
  });
  
  it('works with undefined locale', () => {
    const fmt = getDateFormat(undefined);
    expect(typeof fmt).toBe('string');
    expect(fmt).toContain('DD');
    expect(fmt).toContain('MM');
    expect(fmt).toContain('YYYY');
  });
  
  it('preserves locale-specific literals (at least one non-token char)', () => {
    const fmt = getDateFormat('en-US');
    const literalsOnly = fmt.replace(/DD|MM|YYYY/g, '');
    expect(literalsOnly.length).toBeGreaterThan(0);
  });
  
  it('handles locales that use spaces as literals (sanity)', () => {
    const fmt = getDateFormat('fr-CA');
    expect(fmt).toContain('DD');
    expect(fmt).toContain('MM');
    expect(fmt).toContain('YYYY');
  });
});