import { describe, expect, it } from 'vitest';
import { stepTimeSegment } from '../../template';

describe('stepTimeSegment', () => {
  const template = 'dd.mm.yyyy, HH:MM';

  it('steps the segment at the caret', () => {
    expect(stepTimeSegment('15.01.2026, 12:30', template, 13, 1)).toBe('15.01.2026, 13:30');
    expect(stepTimeSegment('15.01.2026, 12:30', template, 16, 1, 15)).toBe('15.01.2026, 12:45');
    expect(stepTimeSegment('15.01.2026, 12:30', template, 16, -1, 15)).toBe('15.01.2026, 12:15');
  });

  it('steps the hours by one whatever the step', () => {
    expect(stepTimeSegment('15.01.2026, 12:30', template, 13, 1, 15)).toBe('15.01.2026, 13:30');
    expect(stepTimeSegment('15.01.2026, 12:30', template, 13, -1, 15)).toBe('15.01.2026, 11:30');
  });

  it('steps the seconds by the step', () => {
    expect(stepTimeSegment('15.01.2026, 12:30:00', 'dd.mm.yyyy, HH:MM:SS', 19, 1, 15)).toBe('15.01.2026, 12:30:15');
  });

  it('wraps around the range', () => {
    expect(stepTimeSegment('15.01.2026, 23:30', template, 12, 1)).toBe('15.01.2026, 00:30');
    expect(stepTimeSegment('15.01.2026, 12:00', template, 16, -1)).toBe('15.01.2026, 12:59');
    expect(stepTimeSegment('15.01.2026, 12:50', template, 16, 1, 15)).toBe('15.01.2026, 12:05');
  });

  it('returns undefined outside a time segment', () => {
    expect(stepTimeSegment('15.01.2026, 12:30', template, 2, 1)).toBeUndefined();
  });
});
