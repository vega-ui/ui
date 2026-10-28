import { describe, expect, it } from 'vitest';
import { getTypedCountry } from '../getTypedCountry';

describe('getTypedCountry', () => {
  it('returns the country of an international number', () => {
    expect(getTypedCountry('+1 234 567-8900')).toBe('US');
    expect(getTypedCountry('+7 912 345-67-89')).toBe('RU');
  });

  it('returns undefined while the country is unknown', () => {
    expect(getTypedCountry('')).toBeUndefined();
    expect(getTypedCountry('+')).toBeUndefined();
  });
});
