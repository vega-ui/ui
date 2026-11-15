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

export default function DenseEmbeddedCalendar() {
  return (
    <Calendar compact size='xs' variant='primary' locale='en-US' defaultValue='2026-11-18'>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous' />
        <CalendarHeading>
          <CalendarViewButton view='month'><CalendarMonthLabel format='short' /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarHeading>
        <CalendarNextButton aria-label='Next' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays>
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
        <CalendarMonths>
          <CalendarMonthsGrid cols={4} format='short'>
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
  );
}
