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
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsGrid,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const hebrewCalendar = createCalendarSystem('hebrew');
const hebrewDate = new Intl.DateTimeFormat('en-US-u-ca-hebrew', { dateStyle: 'long', timeZone: 'UTC' });

export default function ThirteenMonthYear() {
  const [date, setDate] = useState('2024-03-11');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Calendar calendar={hebrewCalendar} locale='en-US' value={date} onChangeValue={setDate} defaultView='month'>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous' />
          <CalendarHeading>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarHeading>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays>
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
          <CalendarMonths aria-label='Months'>
            <CalendarMonthsGrid cols={4}>
              <CalendarMonth />
            </CalendarMonthsGrid>
          </CalendarMonths>
          <CalendarYears>
            <CalendarYearsScroller>
              <CalendarYearsScrollerContent>
                <CalendarYearsGrid>
                  <CalendarYear />
                </CalendarYearsGrid>
              </CalendarYearsScrollerContent>
            </CalendarYearsScroller>
          </CalendarYears>
        </CalendarContent>
      </Calendar>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {date ? `${date} is ${hebrewDate.format(new Date(date))}` : 'Pick a day'}
      </Text>
    </div>
  );
}
