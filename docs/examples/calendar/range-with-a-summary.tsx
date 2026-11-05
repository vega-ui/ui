import {
  Button,
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const DAY = 86_400_000;
export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

function getSummary(locale: string, start: string, end: string) {
  const dateFormat = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', timeZone: 'UTC' });

  if (!start) return 'Pick a check-in date';
  if (!end) return `Check-in ${dateFormat.format(new Date(start))}, pick a check-out date`;

  const nights = (Date.parse(end) - Date.parse(start)) / DAY;
  const range = dateFormat.formatRange(new Date(start), new Date(end));

  if (nights === 1) return `${range}: 1 night`;

  return `${range}: ${nights} nights`;
}

export default function RangeWithASummary({ locale = 'en-US' }: { locale?: string }) {
  const [[start, end], setRange] = useState<[string, string]>(['', '']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Calendar locale={locale} selection='range' value={[start, end]} onChangeValue={setRange}>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Stay dates'>
            <CalendarWeekdays>
              <CalendarWeekday />
            </CalendarWeekdays>
            <CalendarWeeks>
              <CalendarDay />
            </CalendarWeeks>
          </CalendarDays>
          <CalendarMonths>
            <CalendarMonth />
          </CalendarMonths>
          <CalendarYears>
            <CalendarYear />
          </CalendarYears>
        </CalendarContent>
      </Calendar>
      <Text aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>{getSummary(locale, start, end)}</Text>
      <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setRange(['', ''])} disabled={!start}>
        Clear dates
      </Button>
    </div>
  );
}
