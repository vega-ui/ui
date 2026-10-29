import { describe, expect, it } from 'vitest';
import { formatTemplateTime } from '../../template';

describe('formatTemplateTime', () => {
  it('writes a time by the template', () => {
    expect(formatTemplateTime('09:30', 'HH:MM')).toBe('09:30');
    expect(formatTemplateTime('09:30:05', 'HH:MM:SS')).toBe('09:30:05');
  });

  it('fills missing seconds with zeros', () => {
    expect(formatTemplateTime('09:30', 'HH:MM:SS')).toBe('09:30:00');
  });

  it('drops seconds the template has no segment for', () => {
    expect(formatTemplateTime('09:30:05', 'HH:MM')).toBe('09:30');
  });
});
