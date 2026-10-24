import { describe, expect, it } from 'vitest';
import { getTimeTemplate } from '../../template';

describe('getTimeTemplate', () => {
  it('turns the minutes and seconds of a time format into template segments', () => {
    expect(getTimeTemplate('HH:mm')).toBe('HH:MM');
    expect(getTimeTemplate('HH:mm:ss')).toBe('HH:MM:SS');
  });

  it('keeps the hours and the separators', () => {
    expect(getTimeTemplate('HH.mm')).toBe('HH.MM');
  });
});
