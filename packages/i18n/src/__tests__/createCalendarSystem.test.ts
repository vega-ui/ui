import { describe, expect, it } from 'vitest';
import { addISODays, createCalendarSystem } from '..';

describe('createCalendarSystem', () => {
  it('converts ISO days to fields and back', () => {
    const persian = createCalendarSystem('persian');

    expect(persian.toFields('2025-03-21')).toEqual({ era: 'AP', year: 1404, month: 1, day: 1 });
    expect(persian.fromFields({ year: 1404, month: 1, day: 1 })).toBe('2025-03-21');
  });

  it('round-trips a day of every week over decades', () => {
    for (const identifier of ['persian', 'hebrew', 'japanese', 'islamic-umalqura', 'chinese']) {
      const calendar = createCalendarSystem(identifier);

      for (let date = '1985-01-01'; date < '2035-01-01'; date = addISODays(date, 7)) {
        expect(calendar.fromFields(calendar.toFields(date))).toBe(date);
      }
    }
  }, 30_000);

  it('reports the lengths of months and years', () => {
    const persian = createCalendarSystem('persian');
    const islamic = createCalendarSystem('islamic-umalqura');

    expect(persian.getDaysInMonth({ year: 1403, month: 12 })).toBe(30);
    expect(persian.getDaysInMonth({ year: 1404, month: 12 })).toBe(29);
    expect(islamic.getDaysInMonth({ year: 1446, month: 9 })).toBe(29);
  });

  it('numbers the months of a Hebrew leap year from 1 to 13', () => {
    const hebrew = createCalendarSystem('hebrew');

    expect(hebrew.getMonthsInYear({ year: 5784 })).toBe(13);
    expect(hebrew.getMonthsInYear({ year: 5785 })).toBe(12);
    expect(hebrew.toFields('2024-03-11')).toEqual({ era: 'AM', year: 5784, month: 7, day: 1 });
  });

  it('counts a leap month of the Chinese calendar', () => {
    const chinese = createCalendarSystem('chinese');

    expect(chinese.getMonthsInYear({ year: 2023 })).toBe(13);
    expect(chinese.getMonthsInYear({ year: 2024 })).toBe(12);
    expect(chinese.toFields('2023-04-20')).toEqual({ year: 2023, month: 4, day: 1 });
  });

  it('keeps only the months of an era year and clamps fields to it', () => {
    const japanese = createCalendarSystem('japanese');

    expect(japanese.toFields('2019-04-30')).toEqual({ era: 'Heisei', year: 31, month: 4, day: 30 });
    expect(japanese.toFields('2019-05-01')).toEqual({ era: 'Reiwa', year: 1, month: 5, day: 1 });
    expect(japanese.getMonthsInYear({ era: 'Heisei', year: 31 })).toBe(4);
    expect(japanese.fromFields({ era: 'Heisei', year: 31, month: 5, day: 1 })).toBe('2019-04-30');
    expect(japanese.fromFields({ era: 'Reiwa', year: 1, month: 1, day: 1 })).toBe('2019-05-01');
  });

  it('clamps a year past the end of an era to its last year', () => {
    const japanese = createCalendarSystem('japanese');

    expect(japanese.fromFields({ era: 'Heisei', year: 40, month: 1, day: 1 })).toBe('2019-01-01');
    expect(japanese.getMonthsInYear({ era: 'Heisei', year: 40 })).toBe(4);
  });

  it('throws for an unknown era', () => {
    expect(() => createCalendarSystem('japanese').fromFields({ era: 'Reiw', year: 3, month: 1, day: 1 })).toThrow(RangeError);
  });

  it('throws for days before the year 0001', () => {
    expect(() => createCalendarSystem('gregory').fromFields({ era: 'BC', year: 5, month: 1, day: 1 })).toThrow(RangeError);
  });

  it('finds earlier eras', () => {
    const japanese = createCalendarSystem('japanese');

    expect(japanese.fromFields({ era: 'Shōwa', year: 64, month: 1, day: 7 })).toBe('1989-01-07');
  });

  it('uses the current era when fields have none', () => {
    expect(createCalendarSystem('japanese').fromFields({ year: 1, month: 6, day: 1 })).toBe('2019-06-01');
  });

  it('supports eras that count years backwards', () => {
    const roc = createCalendarSystem('roc');

    expect(roc.toFields('1911-06-01')).toEqual({ era: 'B.R.O.C.', year: 1, month: 6, day: 1 });
    expect(roc.fromFields({ era: 'B.R.O.C.', year: 10, month: 6, day: 1 })).toBe('1902-06-01');
  });

  it('throws for a calendar unknown to Intl', () => {
    expect(() => createCalendarSystem('unknown')).toThrow(RangeError);
  });
});
