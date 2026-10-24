import { describe, expect, it } from 'vitest';
import { gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { parseTemplateRange } from '../../template';

describe('parseTemplateRange', () => {
  it('reads both dates', () => {
    expect(parseTemplateRange(gregorianCalendar, '05.01.2026 - 10.01.2026', 'dd.mm.yyyy', ' - ')).toEqual(['2026-01-05', '2026-01-10']);
  });

  it('keeps the start when the end is incomplete', () => {
    expect(parseTemplateRange(gregorianCalendar, '05.01.2026 - 10.0', 'dd.mm.yyyy', ' - ')).toEqual(['2026-01-05', '']);
    expect(parseTemplateRange(gregorianCalendar, '05.01.2026', 'dd.mm.yyyy', ' - ')).toEqual(['2026-01-05', '']);
  });

  it('is empty without a complete start', () => {
    expect(parseTemplateRange(gregorianCalendar, '', 'dd.mm.yyyy', ' - ')).toEqual(['', '']);
    expect(parseTemplateRange(gregorianCalendar, '05.0', 'dd.mm.yyyy', ' - ')).toEqual(['', '']);
  });

  it('reads the dates in the calendar system', () => {
    const persian = createCalendarSystem('persian');

    expect(parseTemplateRange(persian, '1404/01/01 – 1404/01/31', 'yyyy/mm/dd', ' – ')).toEqual(['2025-03-21', '2025-04-20']);
  });
});
