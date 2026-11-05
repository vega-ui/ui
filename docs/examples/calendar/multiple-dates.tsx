import {
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

const MAX_DAYS = 5;
const dateFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });

export default function MultipleDates() {
  const [days, setDays] = useState<string[]>(['2026-11-04', '2026-11-11']);

  const change = (next: string[]) => {
    if (next.length > MAX_DAYS) return;
    setDays(next);
  };

  const sorted = [...days].sort();
  const isFull = days.length === MAX_DAYS;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Calendar locale='en-US' selection='multiple' value={days} onChangeValue={change}>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Office days'>
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
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text aria-live='polite' fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>
          {days.length} of {MAX_DAYS} office days{isFull ? ', unselect a day to pick another' : ''}
        </Text>
        <ul style={{ margin: 0, paddingInlineStart: 'var(--spacing-12)' }}>
          {sorted.map((day) => (
            <li key={day}><Text style={{ color: 'var(--label-secondary)' }}>{dateFormat.format(new Date(day))}</Text></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
