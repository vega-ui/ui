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
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
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
          <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
          <CalendarHeading>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarHeading>
          <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Office days'>
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
          <CalendarMonths>
            <CalendarMonthsGrid>
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
