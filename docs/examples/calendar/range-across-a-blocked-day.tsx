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
  HelperText,
} from '@vega-ui/react';
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
          <CalendarPrevButton aria-label='Previous' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Room dates' aria-describedby={invalid ? errorId : undefined}>
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
      {invalid && (
        <HelperText id={errorId} error>
          The room is sold out on {blockedLabel}. Pick dates before or after them.
        </HelperText>
      )}
    </div>
  );
}
