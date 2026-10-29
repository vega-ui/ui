import { describe, expect, it } from 'vitest';
import { parseTemplateTime } from '../../template';

describe('parseTemplateTime', () => {
  it('parses a complete time', () => {
    expect(parseTemplateTime('09:30', 'HH:MM')).toBe('09:30');
    expect(parseTemplateTime('23:59:05', 'HH:MM:SS')).toBe('23:59:05');
  });

  it('returns undefined for an incomplete time', () => {
    expect(parseTemplateTime('', 'HH:MM')).toBeUndefined();
    expect(parseTemplateTime('09:3', 'HH:MM')).toBeUndefined();
    expect(parseTemplateTime('09:30', 'HH:MM:SS')).toBeUndefined();
  });

  it('returns undefined for segments out of range', () => {
    expect(parseTemplateTime('24:00', 'HH:MM')).toBeUndefined();
    expect(parseTemplateTime('09:60', 'HH:MM')).toBeUndefined();
  });

  it('returns undefined for wrong separators', () => {
    expect(parseTemplateTime('09-30', 'HH:MM')).toBeUndefined();
  });

  it('accepts the digits of other numbering systems', () => {
    expect(parseTemplateTime('٠٩:٣٠', 'HH:MM')).toBe('09:30');
  });
});
