import { createCalendarSystem } from '@vega-ui/i18n';
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

const persianCalendar = createCalendarSystem('persian');

export default function NonGregorianCalendar() {
  const [date, setDate] = useState('2026-03-21');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Calendar dir='rtl' locale='fa-IR' calendar={persianCalendar} value={date} onChangeValue={setDate}>
        <CalendarHeader>
          <CalendarPrevButton aria-label='ماه قبل' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='ماه بعد' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='روزها'>
            <CalendarWeekdays format='narrow'>
              <CalendarWeekday />
            </CalendarWeekdays>
            <CalendarWeeks>
              <CalendarDay />
            </CalendarWeeks>
          </CalendarDays>
          <CalendarMonths aria-label='ماه‌ها'>
            <CalendarMonth />
          </CalendarMonths>
          <CalendarYears aria-label='سال‌ها'>
            <CalendarYear />
          </CalendarYears>
        </CalendarContent>
      </Calendar>
      <Text style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Stored value: {date || 'none'}</Text>
    </div>
  );
}
