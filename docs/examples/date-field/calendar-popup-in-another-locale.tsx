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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function CalendarPopupInAnotherLocale() {
  return (
    <div lang='de-DE' style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='liefertermin'>Liefertermin</Label>
      <DateField format='dd.MM.yyyy' separator='.' locale='de-DE'>
        <DateFieldInput id='liefertermin' placeholder='TT.MM.JJJJ' aria-describedby='liefertermin-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateFieldTriggerIconButton aria-label='Datum auswählen' />
          </PopoverTrigger>
          <PopoverContent>
            <DateFieldCalendar aria-label='Datum auswählen'>
              <CalendarHeader>
                <CalendarPrevButton aria-label='Vorheriger Monat' />
                <CalendarHeading>
                  <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                  <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                </CalendarHeading>
                <CalendarNextButton aria-label='Nächster Monat' />
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
            </DateFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateField>
      <HelperText id='liefertermin-hint'>Die Woche beginnt im Kalender am Montag.</HelperText>
    </div>
  );
}
