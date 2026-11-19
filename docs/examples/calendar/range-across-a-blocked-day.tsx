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
  HelperText,
  Icon,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const soldOut = ['2026-11-14', '2026-11-15'];
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });

function findSoldOut(start: string, end: string) {
  if (!start || !end) return [];

  return soldOut.filter((day) => day >= start && day <= end);
}

export default function RangeAcrossABlockedDay() {
  const [[start, end], setRange] = useState<[string, string]>(['2026-11-12', '2026-11-17']);
  const errorId = useId();

  const blocked = findSoldOut(start, end);
  const invalid = blocked.length > 0;
  const blockedLabel = blocked.map((day) => dateFormat.format(new Date(day))).join(' and ');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <Calendar locale='en-US' selection='range' disabledDates={soldOut} value={[start, end]} onChangeValue={setRange}>
        <CalendarHeader>
          <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
          <CalendarHeading>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarHeading>
          <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Room dates' aria-describedby={invalid ? errorId : undefined}>
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
      {invalid && (
        <HelperText id={errorId} invalid>
          The room is sold out on {blockedLabel}. Pick dates before or after them.
        </HelperText>
      )}
    </div>
  );
}
