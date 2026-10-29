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

  it('clamps a complete value to min and max', () => {
    const bounds = { min: '09:00', max: '18:30' };

    expect(normalizeTemplateTime('08:00', 'HH:MM', bounds)).toBe('09:00');
    expect(normalizeTemplateTime('19:00', 'HH:MM', bounds)).toBe('18:30');
    expect(normalizeTemplateTime('12:00', 'HH:MM', bounds)).toBe('12:00');
    expect(normalizeTemplateTime('08', 'HH:MM', bounds)).toBe('08');
  });

  it('compares bounds with seconds', () => {
    expect(normalizeTemplateTime('09:00:10', 'HH:MM:SS', { min: '09:00:30' })).toBe('09:00:30');
    expect(normalizeTemplateTime('09:00:00', 'HH:MM:SS', { min: '09:00' })).toBe('09:00:00');
  });
});
