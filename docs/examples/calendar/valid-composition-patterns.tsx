import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonthLabel,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYearLabel,
  Text,
} from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <Calendar locale='en-US'>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous month' />
        <Text fontWeight={600}>
          <CalendarMonthLabel /> <CalendarYearLabel />
        </Text>
        <CalendarNextButton aria-label='Next month' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays aria-label='Days'>
          <CalendarWeekdays>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarWeeks>
            <CalendarDay />
          </CalendarWeeks>
        </CalendarDays>
      </CalendarContent>
    </Calendar>
  );
}
