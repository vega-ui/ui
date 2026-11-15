import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
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
} from '@vega-ui/react';

export default function PagingWithButtonsOnly() {
  return (
    <Calendar locale='en-US' defaultFocusedDate='2026-11-09'>
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
          <CalendarWeeks>
            <CalendarDay />
          </CalendarWeeks>
        </CalendarDays>
        <CalendarMonths aria-label='Months'>
          <CalendarMonthsGrid>
            <CalendarMonth />
          </CalendarMonthsGrid>
        </CalendarMonths>
        <CalendarYears aria-label='Years'>
          <CalendarYearsGrid>
            <CalendarYear />
          </CalendarYearsGrid>
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}
