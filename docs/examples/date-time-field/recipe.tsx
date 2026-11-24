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
  type DateTimeFieldProps,
  Text,
  TimeFieldOption,
  WheelPicker,
  WheelPickerFace,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyDateTimeFieldProps extends DateTimeFieldProps {
  name?: string
  pickerLabel: string
  previousLabel: string
  nextLabel: string
  timeLabel: string
  hoursLabel: string
  minutesLabel: string
  secondsLabel?: string
}

export function MyDateTimeField({ id, name, pickerLabel, previousLabel, nextLabel, timeLabel, hoursLabel, minutesLabel, secondsLabel, ...props }: MyDateTimeFieldProps) {
  const seconds = props.timeFormat === 'HH:mm:ss';
  const timeLabelId = useId();
  const timeButtonId = useId();

  return (
    <DateTimeField {...props}>
      <DateTimeFieldInput id={id} name={name} />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateTimeFieldTrigger square aria-label={pickerLabel}><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent role='dialog' aria-label={pickerLabel}>
          <DateTimeFieldCalendar>
            <CalendarHeader>
              <CalendarPrevButton square aria-label={previousLabel}><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
              <CalendarHeading>
                <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
              </CalendarHeading>
              <CalendarNextButton square aria-label={nextLabel}><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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
            <Text id={timeLabelId}>{timeLabel}</Text>
            <Popover placement='top-end'>
              <PopoverTrigger asChild>
                <Button id={timeButtonId} aria-labelledby={`${timeLabelId} ${timeButtonId}`} aria-haspopup='dialog' size={props.size} variant='secondary' appearance='ghost'>
                  <DateTimeFieldTime placeholder='--:--' />
                </Button>
              </PopoverTrigger>
              <PopoverContent role='dialog' aria-labelledby={timeLabelId} style={{ padding: 'var(--spacing-6)' }}>
                <WheelPicker aria-labelledby={timeLabelId}>
                  <DateTimeFieldColumn unit='hour' aria-label={hoursLabel} autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>
                  <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
                  <DateTimeFieldColumn unit='minute' aria-label={minutesLabel}><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>
                  {seconds && <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>}
                  {seconds && <DateTimeFieldColumn unit='second' aria-label={secondsLabel}><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>}
                </WheelPicker>
              </PopoverContent>
            </Popover>
          </div>
        </PopoverContent>
      </Popover>
    </DateTimeField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Webinar starts at</Label>
      <MyDateTimeField
        id={id}
        name='startsAt'
        dateFormat='dd.MM.yyyy'
        dateSeparator='.'
        separator=', '
        defaultValue='2026-07-15T18:30'
        pickerLabel='Choose webinar date and time'
        previousLabel='Previous month'
        nextLabel='Next month'
        timeLabel='Time'
        hoursLabel='Hours'
        minutesLabel='Minutes'
      />
    </div>
  );
}
