import {
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function DateAndTimeWithACalendarPopover({ locale = 'en-US' }: { locale?: string }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor='starts-at'>Webinar starts at</Label>
      <DateTimeField
        locale={locale}
        dateFormat='dd.MM.yyyy'
        dateSeparator='.'
        separator=', '
        timeFormat='HH:mm'
        defaultValue='2026-07-15T18:30'
      >
        <DateTimeFieldInput id='starts-at' placeholder='dd.mm.yyyy, hh:mm' aria-describedby='starts-at-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateTimeFieldTriggerIconButton aria-label='Choose webinar date' />
          </PopoverTrigger>
          <PopoverContent>
            <DateTimeFieldCalendar aria-label='Choose webinar date'>
              <CalendarHeader>
                <CalendarPrevButton aria-label='Previous month' />
                <CalendarHeading>
                  <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                  <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                </CalendarHeading>
                <CalendarNextButton aria-label='Next month' />
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
                <CalendarMonths>
                  <CalendarMonthsGrid>
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
            </DateTimeFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateTimeField>
      <HelperText id='starts-at-hint'>24-hour time. Picking a day keeps the typed time.</HelperText>
    </div>
  );
}
