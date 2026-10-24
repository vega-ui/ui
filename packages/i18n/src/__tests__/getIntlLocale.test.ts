import { describe, expect, it } from 'vitest';
import { getIntlLocale } from '../locale/getIntlLocale';

describe('getIntlLocale', () => {
  it('reads a locale tag or an Intl.Locale', () => {
    expect(getIntlLocale('de-DE').baseName).toBe('de-DE');
    expect(getIntlLocale(new Intl.Locale('fr-CA')).baseName).toBe('fr-CA');
  });

  it('takes the first locale of a list', () => {
    expect(getIntlLocale(['ru-RU', 'en-US']).baseName).toBe('ru-RU');
  });

  it('keeps Unicode extensions', () => {
    expect(getIntlLocale('en-US-u-fw-mon').toString()).toBe('en-US-u-fw-mon');
  });

  it('falls back to the runtime locale', () => {
    const runtime = new Intl.DateTimeFormat().resolvedOptions().locale;

    expect(getIntlLocale().baseName).toBe(new Intl.Locale(runtime).baseName);
    expect(getIntlLocale([]).baseName).toBe(new Intl.Locale(runtime).baseName);
  });

  it('throws for an invalid locale', () => {
    expect(() => getIntlLocale('not a locale')).toThrow(RangeError);
  });
});
