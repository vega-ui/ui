import { describe, expect, it } from 'vitest';
import { getDateTimeTemplate } from '../../template';

describe('getDateTimeTemplate', () => {
  it('joins the date template, the separator and the time format', () => {
    expect(getDateTimeTemplate({ dateFormat: 'dd.MM.yyyy', dateSeparator: '.', separator: ', ', timeFormat: 'HH:mm' }))
      .toBe('dd.mm.yyyy, HH:MM');
  });

  it('keeps the seconds of the time format', () => {
    expect(getDateTimeTemplate({ dateFormat: 'MM/dd/yyyy', dateSeparator: '/', separator: ' ', timeFormat: 'HH:mm:ss' }))
      .toBe('mm/dd/yyyy HH:MM:SS');
  });
});
