import { useId, useState } from 'react';
import {
  Button,
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
  DateTimeFieldColumn,
  DateTimeFieldInput,
  DateTimeFieldTime,
  DateTimeFieldTrigger,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  TimeFieldOption,
  WheelPicker,
  WheelPickerFace,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function CalendarAndTimeWheels() {
  const [startsAt, setStartsAt] = useState('2026-07-15T18:30');
  const timeLabelId = useId();
  const timeButtonId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='call-starts-at'>Call starts at</Label>
        <DateTimeField
          dateFormat='dd.MM.yyyy'
          timeStep={5}
          today='2026-07-15'
          value={startsAt}
          onChangeValue={setStartsAt}
        >
          <DateTimeFieldInput id='call-starts-at' placeholder='dd.mm.yyyy, hh:mm' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTrigger square aria-label='Choose call date and time'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose call date and time'>
              <DateTimeFieldCalendar>
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)', padding: '0 var(--spacing-6) var(--spacing-6)' }}>
                <Text id={timeLabelId}>Time</Text>
                <Popover placement='top-end'>
                  <PopoverTrigger asChild>
                    <Button id={timeButtonId} aria-labelledby={`${timeLabelId} ${timeButtonId}`} aria-haspopup='dialog' variant='secondary' appearance='ghost'>
                      <DateTimeFieldTime placeholder='--:--' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent role='dialog' aria-label='Choose call time' style={{ padding: 'var(--spacing-6)' }}>
                    <WheelPicker aria-label='Call time'>
                      <DateTimeFieldColumn unit='hour' aria-label='Hours' autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>
                      <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
                      <DateTimeFieldColumn unit='minute' aria-label='Minutes'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>
                    </WheelPicker>
                  </PopoverContent>
                </Popover>
              </div>
            </PopoverContent>
          </Popover>
        </DateTimeField>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {startsAt ? <code>{startsAt}</code> : 'no complete date and time'}
      </Text>
    </div>
  );
}
