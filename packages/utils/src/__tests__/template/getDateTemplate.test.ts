import { describe, expect, it } from 'vitest';
import { getDateTemplate } from '../../template';

describe('getDateTemplate', () => {
  it('lowercases the format and joins its segments with the separator', () => {
    expect(getDateTemplate('dd.MM.yyyy', '.')).toBe('dd.mm.yyyy');
    expect(getDateTemplate('MM/dd/yyyy', '-')).toBe('mm-dd-yyyy');
  });

  it('drops repeated and trailing separators of the format', () => {
    expect(getDateTemplate('yyyy--MM--dd.', '/')).toBe('yyyy/mm/dd');
  });
});
