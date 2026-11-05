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
  useCalendarMonthContext,
  useCalendarWeekdayContext,
  useCalendarYearContext,
} from '@vega-ui/react';

function isLeapYear(year: number) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;

  return year % 4 === 0;
}

function Weekday() {
  const { weekday } = useCalendarWeekdayContext();
  const isWeekend = weekday === 0 || weekday === 6;

  if (!isWeekend) return <CalendarWeekday />;

  return <CalendarWeekday style={{ color: 'var(--label-quaternary)' }} />;
}

function QuarterMonth() {
  const { label, fields } = useCalendarMonthContext();

  if (!fields) return <CalendarMonth />;

  const quarter = Math.ceil(fields.month / 3);

  return <CalendarMonth aria-label={`${label}, quarter ${quarter}`}>{label} · Q{quarter}</CalendarMonth>;
}

function LeapYear() {
  const { label, fields } = useCalendarYearContext();

  if (!fields || !isLeapYear(fields.year)) return <CalendarYear />;

  return <CalendarYear aria-label={`${label}, leap year`} style={{ fontWeight: 700 }}>{label}*</CalendarYear>;
}

export default function WeekdayMonthYearTemplates() {
  return (
    <Calendar locale='en-US' defaultMonth='2026-11-01' defaultView='month'>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton aria-label='Next' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays aria-label='Days'>
          <CalendarWeekdays>
            <Weekday />
          </CalendarWeekdays>
          <CalendarWeeks>
            <CalendarDay />
          </CalendarWeeks>
        </CalendarDays>
        <CalendarMonths aria-label='Months' format='short'>
          <QuarterMonth />
        </CalendarMonths>
        <CalendarYears aria-label='Years'>
          <LeapYear />
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}
