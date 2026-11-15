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
} from '@vega-ui/react';

export default function SingleDateInALocale() {
  return (
    <Calendar locale='de-DE' defaultValue='2026-03-15'>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Zurück' />
        <CalendarHeading>
          <CalendarViewButton view='month'>
            <CalendarMonthLabel />
          </CalendarViewButton>
          <CalendarViewButton view='year'>
            <CalendarYearLabel />
          </CalendarViewButton>
        </CalendarHeading>
        <CalendarNextButton aria-label='Weiter' />
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
        <CalendarMonths aria-label='Monate'>
          <CalendarMonthsGrid>
            <CalendarMonth />
          </CalendarMonthsGrid>
        </CalendarMonths>
        <CalendarYears aria-label='Jahre'>
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
  );
}
