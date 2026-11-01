import { describe, expect, it } from 'vitest';
import { matchTypeahead } from '../matchTypeahead';

const items = [
  { label: 'Moscow' },
  { label: 'Minsk', disabled: true },
  { label: 'Magadan' },
  { label: 'Saint Petersburg' },
];

describe('matchTypeahead', () => {
  it('matches from the start of the label, ignoring case', () => {
    expect(matchTypeahead(items, 'SAI', null)).toBe(3);
    expect(matchTypeahead(items, 'peter', null)).toBe(-1);
  });

  it('keeps the active item while it still matches a longer query', () => {
    expect(matchTypeahead(items, 'mag', 2)).toBe(2);
  });

  it('cycles through items on a repeated character and skips disabled ones', () => {
    expect(matchTypeahead(items, 'm', 0)).toBe(2);
    expect(matchTypeahead(items, 'mm', 2)).toBe(0);
  });

  it('matches a query with a space', () => {
    expect(matchTypeahead(items, 'saint p', null)).toBe(3);
  });
});
