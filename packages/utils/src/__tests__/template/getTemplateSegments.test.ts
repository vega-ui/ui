import { describe, expect, it } from 'vitest';
import { getTemplateSegments } from '../../template/getTemplateSegments';

describe('getTemplateSegments', () => {
  it('returns the field runs of a template with their positions', () => {
    expect(getTemplateSegments('dd.mm.yyyy')).toEqual([
      { type: 'd', start: 0, end: 2 },
      { type: 'm', start: 3, end: 5 },
      { type: 'y', start: 6, end: 10 },
    ]);
  });

  it('tells the month from the minutes by case', () => {
    expect(getTemplateSegments('mm HH:MM:SS').map(({ type }) => type)).toEqual(['m', 'H', 'M', 'S']);
  });

  it('returns no segments for a template without fields', () => {
    expect(getTemplateSegments(' - ')).toEqual([]);
  });
});
