import { describe, expect, it } from 'vitest';
import { toLatinDigits } from '..';

describe('toLatinDigits', () => {
  it('replaces Arabic-Indic and Persian digits', () => {
    expect(toLatinDigits('١٤٠٥/٠١/٠١')).toBe('1405/01/01');
    expect(toLatinDigits('۱۴۰۵/۰۱/۰۱')).toBe('1405/01/01');
  });

  it('replaces the digits of every numbering system of Intl', () => {
    for (const numberingSystem of ['arab', 'arabext', 'beng', 'deva', 'fullwide', 'thai', 'tibt', 'mymr', 'khmr']) {
      const digits = new Intl.NumberFormat('en-US', { numberingSystem, useGrouping: false }).format(1234567890);

      expect(toLatinDigits(digits)).toBe('1234567890');
    }
  });

  it('keeps every other character and the length', () => {
    expect(toLatinDigits('05.01.2026, 08:30')).toBe('05.01.2026, 08:30');
    expect(toLatinDigits('dd/mm/yyyy')).toBe('dd/mm/yyyy');
    expect(toLatinDigits('٢٣‏/١٠').length).toBe('٢٣‏/١٠'.length);
  });
});
