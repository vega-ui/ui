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
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Fieldset,
  FieldsetLegend,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function DisabledByFieldset() {
  const [asap, setAsap] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 300 }}>
      <Checkbox>
        <CheckboxInput checked={asap} onChange={(event) => setAsap(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Ship as soon as possible
      </Checkbox>
      <Fieldset disabled={asap} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <FieldsetLegend>Scheduled shipping</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='ship-on'>Ship on</Label>
          <DateField format='dd.MM.yyyy' separator='.'>
            <DateFieldInput name='shipOn' id='ship-on' placeholder='dd.mm.yyyy' />
            <Popover placement='bottom-end'>
              <PopoverTrigger asChild>
                <DateFieldTriggerIconButton aria-label='Choose shipping date' />
              </PopoverTrigger>
              <PopoverContent>
                <DateFieldCalendar aria-label='Choose shipping date'>
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
                </DateFieldCalendar>
              </PopoverContent>
            </Popover>
          </DateField>
        </div>
      </Fieldset>
    </div>
  );
}
