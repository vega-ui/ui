import { describe, expect, it } from 'vitest';
import { getIntlLocale } from '../locale/getIntlLocale';

describe('getIntlLocale', () => {
  it('takes the first locale of a list', () => {
    expect(getIntlLocale(['ru-RU', 'en-US']).baseName).toBe('ru-RU');
  });

  it('falls back to the runtime locale', () => {
    const runtime = new Intl.DateTimeFormat().resolvedOptions().locale;

    expect(getIntlLocale().baseName).toBe(new Intl.Locale(runtime).baseName);
    expect(getIntlLocale([]).baseName).toBe(new Intl.Locale(runtime).baseName);
  });

});
