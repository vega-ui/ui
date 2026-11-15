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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const FIRST_SLOT = '2026-07-01T09:00';
const LAST_SLOT = '2026-07-31T18:00';

export default function BusinessHoursWindow() {
  const [slot, setSlot] = useState('');
  const outsideWindow = slot !== '' && (slot < FIRST_SLOT || slot > LAST_SLOT);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='delivery-slot'>Delivery slot</Label>
        <DateTimeField
          dateFormat='dd.MM.yyyy'
          min={FIRST_SLOT}
          max={LAST_SLOT}
         
          value={slot}
          onChangeValue={setSlot}
        >
          <DateTimeFieldInput id='delivery-slot' placeholder='dd.mm.yyyy, hh:mm' aria-invalid={outsideWindow} aria-describedby='delivery-slot-hint' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTriggerIconButton aria-label='Choose delivery day' />
            </PopoverTrigger>
            <PopoverContent>
              <DateTimeFieldCalendar aria-label='Choose delivery day'>
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
        <HelperText id='delivery-slot-hint' invalid={outsideWindow}>
          {outsideWindow ? 'We deliver from 01.07.2026, 09:00 to 31.07.2026, 18:00.' : 'From 01.07.2026, 09:00 to 31.07.2026, 18:00. Try 01.07.2026, 08:30 or 25:30.'}
        </HelperText>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {slot ? <code>{slot}</code> : 'no complete date and time'}
      </Text>
    </div>
  );
}
