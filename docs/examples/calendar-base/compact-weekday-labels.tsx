import {
  CalendarBase,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
} from '@vega-ui/react';

const LOCALE = 'en-US';
const WEEK_START = 0;
const narrowFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'narrow', timeZone: 'UTC' });
const longFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'long', timeZone: 'UTC' });

const weekdays = Array.from({ length: 7 }, (_, index) => {
  const date = Date.UTC(2026, 10, 1 + WEEK_START + index);

  return { narrow: narrowFormat.format(date), long: longFormat.format(date) };
});

export default function CompactWeekdayLabels() {
  return (
    <CalendarBase compact size='xs'>
      <DayPicker aria-label='November 2026' locale={LOCALE} month='2026-11-01'>
        <CalendarBaseWeekLabels>
          {weekdays.map(({ narrow, long }) => (
            <CalendarBaseWeekLabel key={long} aria-label={long} title={long}>{narrow}</CalendarBaseWeekLabel>
          ))}
        </CalendarBaseWeekLabels>
        <DayPickerLayout weekStartsOn={WEEK_START}>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
    </CalendarBase>
  );
}
