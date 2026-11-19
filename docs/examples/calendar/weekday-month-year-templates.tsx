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
  useCalendarMonthContext,
  useCalendarWeekdayContext,
  useCalendarYearContext,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

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
    <Calendar locale='en-US' defaultFocusedDate='2026-11-01' defaultView='month'>
      <CalendarHeader>
        <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
        <CalendarHeading>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarHeading>
        <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays>
          <CalendarWeekdays>
            <Weekday />
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
          <CalendarMonthsGrid format='short'>
            <QuarterMonth />
          </CalendarMonthsGrid>
        </CalendarMonths>
        <CalendarYears aria-label='Years'>
          <CalendarYearsScroller>
            <CalendarYearsScrollerContent>
              <CalendarYearsGrid>
                <LeapYear />
              </CalendarYearsGrid>
            </CalendarYearsScrollerContent>
          </CalendarYearsScroller>
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}
