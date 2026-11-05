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
} from '@vega-ui/react';

export default function SingleDateInALocale() {
  return (
    <Calendar locale='de-DE' defaultValue='2026-03-15'>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Zurück' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'>
            <CalendarMonthLabel />
          </CalendarViewButton>
          <CalendarViewButton view='year'>
            <CalendarYearLabel />
          </CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton aria-label='Weiter' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays aria-label='Tage'>
          <CalendarWeekdays>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarWeeks>
            <CalendarDay />
          </CalendarWeeks>
        </CalendarDays>
        <CalendarMonths aria-label='Monate'>
          <CalendarMonth />
        </CalendarMonths>
        <CalendarYears aria-label='Jahre'>
          <CalendarYear />
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}
