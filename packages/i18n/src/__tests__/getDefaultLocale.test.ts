import { describe, expect, it } from 'vitest';
import { getDefaultLocale } from '..';

describe('getDefaultLocale', () => {
  it('returns the locale Intl uses by default', () => {
    expect(getDefaultLocale()).toBe(new Intl.DateTimeFormat().resolvedOptions().locale);
  });

  it('is a valid BCP 47 tag', () => {
    expect(() => new Intl.Locale(getDefaultLocale())).not.toThrow();
  });
});
