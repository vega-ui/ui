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
  Icon,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function PagingWithButtonsOnly() {
  return (
    <Calendar locale='en-US' defaultFocusedDate='2026-11-09'>
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
