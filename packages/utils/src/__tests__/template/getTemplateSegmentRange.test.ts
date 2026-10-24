import { describe, expect, it } from 'vitest';
import { createCalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { getTemplateSegmentRange } from '../../template/getTemplateSegmentRange';

describe('getTemplateSegmentRange', () => {
  it('returns the widest ranges while the fields are unknown', () => {
    expect(getTemplateSegmentRange(gregorianCalendar, 'y', {})).toEqual([1, 9999]);
    expect(getTemplateSegmentRange(gregorianCalendar, 'm', {})).toEqual([1, 13]);
    expect(getTemplateSegmentRange(gregorianCalendar, 'd', { y: 2026 })).toEqual([1, 31]);
  });

  it('limits the month and day by the calendar', () => {
    expect(getTemplateSegmentRange(gregorianCalendar, 'm', { y: 2026 })).toEqual([1, 12]);
    expect(getTemplateSegmentRange(gregorianCalendar, 'd', { y: 2024, m: 2 })).toEqual([1, 29]);
    expect(getTemplateSegmentRange(createCalendarSystem('hebrew'), 'm', { y: 5784 })).toEqual([1, 13]);
  });

  it('returns the time ranges', () => {
    expect(getTemplateSegmentRange(gregorianCalendar, 'H', {})).toEqual([0, 23]);
    expect(getTemplateSegmentRange(gregorianCalendar, 'M', {})).toEqual([0, 59]);
  });
});
