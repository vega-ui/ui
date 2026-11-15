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

const FIRST_DAY = '2026-01-01';
const LAST_DAY = '2026-12-31';

export default function ReversedAndOutOfRangeDates() {
  const [campaign, setCampaign] = useState<[string, string]>(['', '']);
  const outOfRange = campaign.some((date) => date !== '' && (date < FIRST_DAY || date > LAST_DAY));

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='campaign-dates'>Campaign dates</Label>
        <DateRangeField
          format='dd.MM.yyyy'
          separator='.'
          rangeSeparator=' - '
          min={FIRST_DAY}
          max={LAST_DAY}
         
          value={campaign}
          onChangeValue={setCampaign}
        >
          <DateRangeFieldInput id='campaign-dates' placeholder='dd.mm.yyyy - dd.mm.yyyy' aria-invalid={outOfRange} aria-describedby='campaign-dates-hint' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTriggerIconButton aria-label='Choose campaign dates' />
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar aria-label='Choose campaign dates'>
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
        <HelperText id='campaign-dates-hint' invalid={outOfRange}>
          {outOfRange ? 'The campaign runs within 2026.' : 'Within 2026. Try 15.01.2026 - 10.01.2026 or 20.12.2025 - 31.02.2026.'}
        </HelperText>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: <code>{JSON.stringify(campaign)}</code>
      </Text>
    </div>
  );
}
