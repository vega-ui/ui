import { describe, expect, it } from 'vitest';
import { normalizeTemplateTime } from '../../template';

describe('normalizeTemplateTime', () => {
  it('keeps a valid value', () => {
    expect(normalizeTemplateTime('09:30', 'HH:MM')).toBe('09:30');
    expect(normalizeTemplateTime('09:3', 'HH:MM')).toBe('09:3');
  });

  it('pads a digit that cannot start a two-digit segment', () => {
    expect(normalizeTemplateTime('3', 'HH:MM')).toBe('03');
    expect(normalizeTemplateTime('2', 'HH:MM')).toBe('2');
    expect(normalizeTemplateTime('09:7', 'HH:MM')).toBe('09:07');
  });

  it('clamps complete segments to their range', () => {
    expect(normalizeTemplateTime('25', 'HH:MM')).toBe('23');
    expect(normalizeTemplateTime('09:61', 'HH:MM')).toBe('09:59');
  });
});
