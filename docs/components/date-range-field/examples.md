# DateRangeField Examples

## Basic

### Basic: booking range with a calendar popover

One field for a start and an end date: type both, or pick two days in the calendar. The other examples reuse this `CalendarPopover` component.

```tsx
const CalendarPopover = () => (
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateRangeFieldTriggerIconButton aria-label='Choose dates' />
    </PopoverTrigger>
    <PopoverContent>
      <DateRangeFieldCalendar>
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
      </DateRangeFieldCalendar>
    </PopoverContent>
  </Popover>
);

<>
  <Label htmlFor='stay'>Stay</Label>
  <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' - '>
    <DateRangeFieldInput id='stay' placeholder='dd.mm.yyyy - dd.mm.yyyy' />
    <CalendarPopover />
  </DateRangeField>
</>
```

## Controlled/Stateful

### Controlled/Stateful: number of nights

The field owns its text. Mirror it into state with `onInput`: split it at `rangeSeparator` and parse both halves with `parseTemplateDate`, which returns `undefined` until a date is complete.

```tsx
import { FormEvent, useState } from 'react';
import { gregorianCalendar } from '@vega-ui/i18n';
import { parseTemplateDate } from '@vega-ui/utils';

const DAY_MS = 24 * 60 * 60 * 1000;

function StayNights() {
  const [nights, setNights] = useState<number>();

  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const [startText = '', endText = ''] = event.currentTarget.value.split(' - ');
    const start = parseTemplateDate(gregorianCalendar, startText, 'dd.mm.yyyy');
    const end = parseTemplateDate(gregorianCalendar, endText, 'dd.mm.yyyy');

    if (!start || !end) {
      setNights(undefined);
      return;
    }

    setNights((Date.parse(end) - Date.parse(start)) / DAY_MS);
  };

  return (
    <>
      <Label htmlFor='stay'>Stay</Label>
      <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' - '>
        <DateRangeFieldInput id='stay' aria-describedby='stay-nights' onInput={onInput} />
        <CalendarPopover />
      </DateRangeField>
      <HelperText id='stay-nights'>{nights === undefined ? 'Choose check-in and check-out.' : `Nights: ${nights}`}</HelperText>
    </>
  );
}
```

## Form/Integration

### Form/Integration: report filter with two API parameters

`name` submits the whole typed text, for example `01.01.2026 - 31.03.2026`. Split it into `from` and `to` ISO days in the submit handler.

```tsx
import { FormEvent } from 'react';
import { gregorianCalendar } from '@vega-ui/i18n';
import { parseTemplateDate } from '@vega-ui/utils';

function ReportFilter() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = String(new FormData(event.currentTarget).get('period'));
    const [fromText = '', toText = ''] = text.split(' - ');

    loadReport({
      from: parseTemplateDate(gregorianCalendar, fromText, 'dd.mm.yyyy'),
      to: parseTemplateDate(gregorianCalendar, toText, 'dd.mm.yyyy'),
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Label htmlFor='period'>Reporting period</Label>
      <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' - '>
        <DateRangeFieldInput id='period' name='period' aria-describedby='period-hint' />
        <CalendarPopover />
      </DateRangeField>
      <HelperText id='period-hint'>Used to filter export totals.</HelperText>
      <Button type='submit'>Apply</Button>
    </form>
  );
}
```

## Layout/Overlay

### Layout/Overlay: range in a filter drawer

The calendar popover opens above the drawer that contains the field.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Filters</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent>
        <DrawerTitle>Filters</DrawerTitle>
        <Label htmlFor='created'>Created</Label>
        <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' - '>
          <DateRangeFieldInput id='created' />
          <CalendarPopover />
        </DateRangeField>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Error

### Error: both dates required

A single date is a valid entry for the field. Native `required` and a `pattern` for the full range make submit fire `invalid` until both dates are complete; `error` on the root shows the error state.

```tsx
import { useState } from 'react';

function CoverageForm() {
  const [invalid, setInvalid] = useState(false);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Label htmlFor='coverage'>Coverage period</Label>
      <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' - ' error={invalid}>
        <DateRangeFieldInput
          id='coverage'
          name='coverage'
          required
          pattern='\d{2}\.\d{2}\.\d{4} - \d{2}\.\d{2}\.\d{4}'
          aria-invalid={invalid}
          aria-describedby='coverage-hint'
          onInvalid={() => setInvalid(true)}
          onInput={() => setInvalid(false)}
        />
        <CalendarPopover />
      </DateRangeField>
      <HelperText id='coverage-hint' error={invalid}>Choose both a start and an end date.</HelperText>
      <Button type='submit'>Save</Button>
    </form>
  );
}
```

## Disabled

### Disabled: locked billing period

`disabled` on the root disables the input and the calendar trigger. `defaultValue` is the native initial text; the field parses it like typed text, so the calendar opens with that range selected.

```tsx
<>
  <Label htmlFor='billing-period'>Billing period</Label>
  <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' - ' disabled>
    <DateRangeFieldInput id='billing-period' defaultValue='01.01.2026 - 31.03.2026' />
    <CalendarPopover />
  </DateRangeField>
</>
```

## Edge

### Edge: reversed and out-of-range dates

A range typed backwards is swapped, so `15.01.2026 - 10.01.2026` becomes `10.01.2026 - 15.01.2026`. Each date is clamped to `min` and `max` and to the length of its month.

```tsx
<DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' - ' min='2026-01-01' max='2026-12-31'>
  <DateRangeFieldInput aria-label='Campaign dates' />
  <CalendarPopover />
</DateRangeField>
```

### Edge: blackout dates

`disabledDates` blocks days in the calendar. Typed dates are not checked against it, so repeat the rule on submit.

```tsx
<DateRangeField
  format='dd.MM.yyyy'
  separator='.'
  rangeSeparator=' - '
  disabledDates={['2026-06-12', '2026-06-13', '2026-06-14']}
>
  <DateRangeFieldInput aria-label='Rental dates' />
  <CalendarPopover />
</DateRangeField>
```

### Edge: default range separator

Without `rangeSeparator`, the dates are joined by an en dash between non-breaking spaces (`' – '`). Pass `rangeSeparator` explicitly when code splits or validates the text.

```tsx
<DateRangeField format='dd.MM.yyyy' separator='.'>
  <DateRangeFieldInput aria-label='Trip dates' />
  <CalendarPopover />
</DateRangeField>
```
