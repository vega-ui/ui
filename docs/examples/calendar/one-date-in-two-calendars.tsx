import { createCalendarSystem } from '@vega-ui/i18n';
import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonthLabel,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYearLabel,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const islamicCalendar = createCalendarSystem('islamic-umalqura');

export default function OneDateInTwoCalendars() {
  const [date, setDate] = useState('2026-10-23');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'start' }}>
        <Calendar compact locale='en-GB' value={date} onChangeValue={setDate}>
          <CalendarHeader>
            <CalendarPrevButton aria-label='Previous month' />
            <Text fontWeight={600}><CalendarMonthLabel /> <CalendarYearLabel /></Text>
            <CalendarNextButton aria-label='Next month' />
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='Gregorian date'>
              <CalendarWeekdays>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarWeeks>
                <CalendarDay />
              </CalendarWeeks>
            </CalendarDays>
          </CalendarContent>
        </Calendar>
        <Calendar compact dir='rtl' locale='ar-SA' calendar={islamicCalendar} value={date} onChangeValue={setDate}>
          <CalendarHeader>
            <CalendarPrevButton aria-label='الشهر السابق' />
            <Text fontWeight={600}><CalendarMonthLabel /> <CalendarYearLabel /></Text>
            <CalendarNextButton aria-label='الشهر التالي' />
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='التاريخ الهجري'>
              <CalendarWeekdays format='narrow'>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarWeeks>
                <CalendarDay />
              </CalendarWeeks>
            </CalendarDays>
          </CalendarContent>
        </Calendar>
      </div>
      <Text style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Stored value: {date}</Text>
    </div>
  );
}
