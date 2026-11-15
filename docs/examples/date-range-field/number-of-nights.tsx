import { useState } from 'react';
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const NIGHTLY_RATE = 140;

const countNights = ([checkIn, checkOut]: [string, string]) => {
  if (!checkIn || !checkOut) return 0;

  return (Date.parse(checkOut) - Date.parse(checkIn)) / 86_400_000;
};

export default function StayNights() {
  const [stay, setStay] = useState<[string, string]>(['', '']);
  const nights = countNights(stay);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='stay-nights'>Stay</Label>
        <DateRangeField format='dd.MM.yyyy' separator='.' value={stay} onChangeValue={setStay}>
          <DateRangeFieldInput id='stay-nights' placeholder='dd.mm.yyyy – dd.mm.yyyy' aria-describedby='stay-nights-total' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTriggerIconButton aria-label='Choose stay dates' />
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar aria-label='Choose stay dates'>
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
              </DateRangeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateRangeField>
        <HelperText id='stay-nights-total' aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>
          {nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'} · €${nights * NIGHTLY_RATE}` : 'Choose check-in and check-out.'}
        </HelperText>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: <code>{JSON.stringify(stay)}</code>
      </Text>
    </div>
  );
}
