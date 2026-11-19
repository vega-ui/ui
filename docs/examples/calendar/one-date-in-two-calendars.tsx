import { createCalendarSystem } from '@vega-ui/i18n';
import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
  CalendarMonthLabel,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYearLabel,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { useState } from 'react';

const islamicCalendar = createCalendarSystem('islamic-umalqura');

export default function OneDateInTwoCalendars() {
  const [date, setDate] = useState('2026-10-23');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'start' }}>
        <Calendar compact locale='en-GB' value={date} onChangeValue={setDate}>
          <CalendarHeader>
            <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
            <CalendarHeading>
              <Text fontWeight={600}><CalendarMonthLabel /> <CalendarYearLabel /></Text>
            </CalendarHeading>
            <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='Gregorian date'>
              <CalendarWeekdays>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarDaysScroller>
                <CalendarDaysScrollerContent>
                  <CalendarWeeks>
                    <CalendarDay />
                  </CalendarWeeks>
                </CalendarDaysScrollerContent>
              </CalendarDaysScroller>
            </CalendarDays>
          </CalendarContent>
        </Calendar>
        <Calendar compact dir='rtl' locale='ar-SA' calendar={islamicCalendar} value={date} onChangeValue={setDate}>
          <CalendarHeader>
            <CalendarPrevButton square aria-label='الشهر السابق'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
            <CalendarHeading>
              <Text fontWeight={600}><CalendarMonthLabel /> <CalendarYearLabel /></Text>
            </CalendarHeading>
            <CalendarNextButton square aria-label='الشهر التالي'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='التاريخ الهجري'>
              <CalendarWeekdays format='narrow'>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarDaysScroller>
                <CalendarDaysScrollerContent>
                  <CalendarWeeks>
                    <CalendarDay />
                  </CalendarWeeks>
                </CalendarDaysScrollerContent>
              </CalendarDaysScroller>
            </CalendarDays>
          </CalendarContent>
        </Calendar>
      </div>
      <Text style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Stored value: {date}</Text>
    </div>
  );
}
