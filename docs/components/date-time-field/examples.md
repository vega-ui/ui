# DateTimeField Examples

## Basic

### Basic: date and time with a calendar popover

One field for a date and a time; the calendar picks the day and keeps the typed time, or `00:00` while the text is not a complete date and time. `dateSeparator`, `separator`, and `timeFormat` here are the defaults; the other examples omit them and reuse this `CalendarPopover` component.

```tsx
const CalendarPopover = () => (
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateTimeFieldTriggerIconButton aria-label='Choose date' />
    </PopoverTrigger>
    <PopoverContent>
      <DateTimeFieldCalendar>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous month' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next month' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays>
            <CalendarWeekdays>
              <CalendarWeekday />
            </CalendarWeekdays>
            <CalendarWeeks>
              <CalendarDay />
            </CalendarWeeks>
          </CalendarDays>
          <CalendarMonths>
            <CalendarMonth />
          </CalendarMonths>
          <CalendarYears>
            <CalendarYear />
          </CalendarYears>
        </CalendarContent>
      </DateTimeFieldCalendar>
    </PopoverContent>
  </Popover>
);

<>
  <Label htmlFor='starts-at'>Starts at</Label>
  <DateTimeField dateFormat='dd.MM.yyyy' dateSeparator='.' separator=', ' timeFormat='HH:mm'>
    <DateTimeFieldInput id='starts-at' placeholder='dd.mm.yyyy, hh:mm' />
    <CalendarPopover />
  </DateTimeField>
</>
```

## Controlled/Stateful

### Controlled/Stateful: meeting end follows the start

The field owns its text. Mirror the start into state with `onInput` and `parseTemplateDate`, and use it as the `min` of the end field, so an end typed before the start is clamped to it, also when the start changes after the end was typed.

```tsx
import { useState } from 'react';
import { gregorianCalendar } from '@vega-ui/i18n';
import { parseTemplateDate } from '@vega-ui/utils';

function MeetingTime() {
  const [start, setStart] = useState<string>();

  return (
    <Fieldset>
      <FieldsetLegend>Meeting</FieldsetLegend>
      <Label htmlFor='meeting-start'>Start</Label>
      <DateTimeField dateFormat='dd.MM.yyyy'>
        <DateTimeFieldInput
          id='meeting-start'
          onInput={(event) => setStart(parseTemplateDate(gregorianCalendar, event.currentTarget.value, 'dd.mm.yyyy, HH:MM'))}
        />
        <CalendarPopover />
      </DateTimeField>
      <Label htmlFor='meeting-end'>End</Label>
      <DateTimeField dateFormat='dd.MM.yyyy' min={start}>
        <DateTimeFieldInput id='meeting-end' />
        <CalendarPopover />
      </DateTimeField>
    </Fieldset>
  );
}
```

## Form/Integration

### Form/Integration: submitting a local date-time

`name` submits the typed text, for example `15.07.2026, 09:30`. Parse it to `2026-07-15T09:30`: a wall-clock time without an offset, so send the timezone with it.

```tsx
import { FormEvent } from 'react';
import { gregorianCalendar } from '@vega-ui/i18n';
import { parseTemplateDate } from '@vega-ui/utils';

function PublishForm() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = String(new FormData(event.currentTarget).get('publishAt'));
    schedulePost({
      publishAt: parseTemplateDate(gregorianCalendar, text, 'dd.mm.yyyy, HH:MM'),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Label htmlFor='publish-at'>Publish at</Label>
      <DateTimeField dateFormat='dd.MM.yyyy'>
        <DateTimeFieldInput id='publish-at' name='publishAt' aria-describedby='publish-at-hint' />
        <CalendarPopover />
      </DateTimeField>
      <HelperText id='publish-at-hint'>Your local time.</HelperText>
      <Button type='submit'>Schedule</Button>
    </form>
  );
}
```

## Layout/Overlay

### Layout/Overlay: rescheduling inside a sheet

The calendar popover opens above the sheet that contains the field.

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Reschedule</Button>
  </SheetTrigger>
  <SheetContent aria-label='Reschedule'>
    <Label htmlFor='new-time'>New time</Label>
    <DateTimeField dateFormat='dd.MM.yyyy'>
      <DateTimeFieldInput id='new-time' />
      <CalendarPopover />
    </DateTimeField>
  </SheetContent>
</Sheet>
```

## Error

### Error: required and incomplete timestamp

Native `required` and `pattern` make submit fire `invalid` while the field is empty or the date or time is incomplete; `error` on the root shows the error state.

```tsx
import { useState } from 'react';

function JobForm() {
  const [invalid, setInvalid] = useState(false);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Label htmlFor='run-at'>Run at</Label>
      <DateTimeField dateFormat='dd.MM.yyyy' error={invalid}>
        <DateTimeFieldInput
          id='run-at'
          name='runAt'
          required
          pattern='\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}'
          aria-invalid={invalid}
          aria-describedby='run-at-hint'
          onInvalid={() => setInvalid(true)}
          onInput={() => setInvalid(false)}
        />
        <CalendarPopover />
      </DateTimeField>
      <HelperText id='run-at-hint' error={invalid}>Enter the date and time as dd.mm.yyyy, hh:mm.</HelperText>
      <Button type='submit'>Save</Button>
    </form>
  );
}
```

## Disabled

### Disabled: locked execution time

`disabled` on the root disables the input and the calendar trigger. `defaultValue` on the root is the initial `YYYY-MM-DDTHH:mm` timestamp; the input shows it in the format and the calendar opens with that day selected.

```tsx
<>
  <Label htmlFor='executed-at'>Executed at</Label>
  <DateTimeField dateFormat='dd.MM.yyyy' disabled defaultValue='2026-07-15T09:30'>
    <DateTimeFieldInput id='executed-at' />
    <CalendarPopover />
  </DateTimeField>
</>
```

## Edge

### Edge: business hours window

`min` and `max` include the time: a complete value outside them is replaced by the nearest bound, so `01.07.2026, 08:30` becomes `01.07.2026, 09:00`. Hours and minutes are clamped to their range, so `25:30` becomes `23:30`.

```tsx
<DateTimeField dateFormat='dd.MM.yyyy' min='2026-07-01T09:00' max='2026-07-31T18:00'>
  <DateTimeFieldInput aria-label='Delivery slot' />
  <CalendarPopover />
</DateTimeField>
```

### Edge: quarter-hour steps

`timeStep` sets how far `ArrowUp` and `ArrowDown` move the minutes under the caret, wrapping from `45` to `00` without changing the hour. On the hours the arrows still move by one, like a native `datetime-local` input with `step`. Typed minutes are kept as typed.

```tsx
<DateTimeField dateFormat='dd.MM.yyyy' timeStep={15}>
  <DateTimeFieldInput aria-label='Reminder' />
  <CalendarPopover />
</DateTimeField>
```

### Edge: seconds precision

`timeFormat='HH:mm:ss'` adds a seconds segment, and `min` and `max` can then include seconds.

```tsx
<DateTimeField dateFormat='dd.MM.yyyy' timeFormat='HH:mm:ss' min='2026-07-01T00:00:00'>
  <DateTimeFieldInput aria-label='Log entry time' />
  <CalendarPopover />
</DateTimeField>
```
