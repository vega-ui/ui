import { describe, expect, it } from 'vitest';
import { gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { formatTemplateRange } from '../../template';

describe('formatTemplateRange', () => {
  it('writes both dates', () => {
    expect(formatTemplateRange(gregorianCalendar, ['2026-01-05', '2026-01-10'], 'dd.mm.yyyy', ' - ')).toBe('05.01.2026 - 10.01.2026');
  });

  it('writes only the start without an end', () => {
    expect(formatTemplateRange(gregorianCalendar, ['2026-01-05', ''], 'dd.mm.yyyy', ' - ')).toBe('05.01.2026');
  });

  it('is empty without a start', () => {
    expect(formatTemplateRange(gregorianCalendar, ['', ''], 'dd.mm.yyyy', ' - ')).toBe('');
    expect(formatTemplateRange(gregorianCalendar, ['', '2026-01-10'], 'dd.mm.yyyy', ' - ')).toBe('');
  });

  it('writes the dates in the calendar system', () => {
    const persian = createCalendarSystem('persian');

    expect(formatTemplateRange(persian, ['2025-03-21', '2025-04-20'], 'yyyy/mm/dd', ' – ')).toBe('1404/01/01 – 1404/01/31');
  });
});
