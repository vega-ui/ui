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
  useCalendarDayContext,
} from '@vega-ui/react';

const fares: Record<string, number> = {
  '2026-11-02': 89,
  '2026-11-03': 89,
  '2026-11-05': 112,
  '2026-11-06': 129,
  '2026-11-09': 74,
  '2026-11-10': 74,
  '2026-11-13': 149,
  '2026-11-16': 89,
  '2026-11-19': 99,
  '2026-11-20': 139,
};

const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function hasNoFare(date: string) {
  return fares[date] === undefined;
}

function FareDay() {
  const { date, label } = useCalendarDayContext();
  const fare = date === undefined ? undefined : fares[date];

  if (fare === undefined) return <CalendarDay />;

  return (
    <CalendarDay style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.1 }}>
      <span>{label}</span>
      <small style={{ fontSize: '0.7em', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{price.format(fare)}</small>
    </CalendarDay>
  );
}

export default function DayCellCustomRendering() {
  return (
    <Calendar size='md' locale='en-US' defaultMonth='2026-11-01' disabledDates={hasNoFare}>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton aria-label='Next' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays aria-label='Departure date'>
          <CalendarWeekdays>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarWeeks>
            <FareDay />
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
  );
}
