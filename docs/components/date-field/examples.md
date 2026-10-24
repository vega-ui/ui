# DateField Examples

## Basic

### Basic: typed date with a calendar popover

A labelled field where users type a date or pick it in a popover calendar. The other examples reuse this `CalendarPopover` component.

```tsx
const CalendarPopover = () => (
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateFieldTriggerIconButton aria-label='Choose date' />
    </PopoverTrigger>
    <PopoverContent>
      <DateFieldCalendar>
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
      </DateFieldCalendar>
    </PopoverContent>
  </Popover>
);

<>
  <Label htmlFor='due-date'>Due date</Label>
  <DateField format='dd.MM.yyyy' separator='.'>
    <DateFieldInput id='due-date' placeholder='dd.mm.yyyy' />
    <CalendarPopover />
  </DateField>
</>
```

## Controlled/Stateful

### Controlled/Stateful: check-out starts after check-in

The field owns its text. Mirror it into state with `onInput` and `parseTemplateDate`, then drive another field's `min` from it. The parser returns `undefined` until the date is complete, and picking a day in the calendar fires the same `input` event. When check-in moves later, a check-out typed earlier is clamped to the new `min`, with the same `input` and `change` events as a calendar pick.

```tsx
import { useState } from 'react';
import { gregorianCalendar, addISODays } from '@vega-ui/i18n';
import { parseTemplateDate } from '@vega-ui/utils';

function StayDates() {
  const [checkIn, setCheckIn] = useState<string>();
  const checkOutMin = checkIn ? addISODays(checkIn, 1) : undefined;

  return (
    <Fieldset>
      <FieldsetLegend>Stay</FieldsetLegend>
      <Label htmlFor='check-in'>Check-in</Label>
      <DateField format='dd.MM.yyyy' separator='.'>
        <DateFieldInput
          id='check-in'
          onInput={(event) => setCheckIn(parseTemplateDate(gregorianCalendar, event.currentTarget.value, 'dd.mm.yyyy'))}
        />
        <CalendarPopover />
      </DateField>
      <Label htmlFor='check-out'>Check-out</Label>
      <DateField format='dd.MM.yyyy' separator='.' min={checkOutMin}>
        <DateFieldInput id='check-out' />
        <CalendarPopover />
      </DateField>
    </Fieldset>
  );
}
```

## Form/Integration

### Form/Integration: submitting the typed text

`DateFieldInput` is a native `<input>`, so `name` submits the typed text, for example `15.01.2026`. Convert it to an ISO day before sending it to the API.

```tsx
import { FormEvent } from 'react';
import { gregorianCalendar } from '@vega-ui/i18n';
import { parseTemplateDate } from '@vega-ui/utils';

function InvoiceForm() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = String(new FormData(event.currentTarget).get('invoiceDate'));
    saveInvoice({ invoiceDate: parseTemplateDate(gregorianCalendar, text, 'dd.mm.yyyy') });
  };

  return (
    <form onSubmit={onSubmit}>
      <Label htmlFor='invoice-date'>Invoice date</Label>
      <DateField format='dd.MM.yyyy' separator='.'>
        <DateFieldInput id='invoice-date' name='invoiceDate' aria-describedby='invoice-date-hint' />
        <CalendarPopover />
      </DateField>
      <HelperText id='invoice-date-hint'>Used as the accounting reference date.</HelperText>
      <Button type='submit'>Save</Button>
    </form>
  );
}
```

## Layout/Overlay

### Layout/Overlay: date field inside a dialog

The calendar popover opens above the dialog that contains the field.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Schedule review</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogTitle>Schedule review</DialogTitle>
        <Label htmlFor='review-date'>Review date</Label>
        <DateField format='dd.MM.yyyy' separator='.'>
          <DateFieldInput id='review-date' />
          <CalendarPopover />
        </DateField>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Error

### Error: required and incomplete dates

`required` and `pattern` are native constraints of the input: submit fires `invalid` while the field is empty or the date is incomplete, and `error` on the root shows the error state. The mask clamps every complete date to a real day, so checking that the date is complete is enough.

```tsx
import { useState } from 'react';

function RenewalForm() {
  const [invalid, setInvalid] = useState(false);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Label htmlFor='renewal-date'>Renewal date</Label>
      <DateField format='dd.MM.yyyy' separator='.' error={invalid}>
        <DateFieldInput
          id='renewal-date'
          name='renewalDate'
          required
          pattern='\d{2}\.\d{2}\.\d{4}'
          aria-invalid={invalid}
          aria-describedby='renewal-date-hint'
          onInvalid={() => setInvalid(true)}
          onInput={() => setInvalid(false)}
        />
        <CalendarPopover />
      </DateField>
      <HelperText id='renewal-date-hint' error={invalid}>Enter the full date as dd.mm.yyyy.</HelperText>
      <Button type='submit'>Save</Button>
    </form>
  );
}
```

## Disabled

### Disabled: locked contract date

`disabled` on the root disables the input and the calendar trigger. `defaultValue` is the native initial text; the field parses it like typed text, so the calendar opens with that day selected.

```tsx
<>
  <Label htmlFor='signed-on'>Signed on</Label>
  <DateField format='dd.MM.yyyy' separator='.' disabled>
    <DateFieldInput id='signed-on' defaultValue='15.01.2026' />
    <CalendarPopover />
  </DateField>
</>
```

## Edge

### Edge: typed dates are clamped

A typed day past the end of the month is clamped to the month length, so `31.02.2026` becomes `28.02.2026`. A complete date outside `min` and `max` is replaced by the nearest bound, so `05.01.2026` becomes `10.01.2026`. The calendar disables the same days.

```tsx
<DateField format='dd.MM.yyyy' separator='.' min='2026-01-10' max='2026-12-31'>
  <DateFieldInput aria-label='Start date' />
  <CalendarPopover />
</DateField>
```

### Edge: weekends unavailable

`disabledDates` takes ISO days or a function. It applies only to the calendar: a typed weekend is accepted, so check the same rule on submit.

```tsx
import { getISOWeekday } from '@vega-ui/i18n';

const isWeekend = (date: string) => [0, 6].includes(getISOWeekday(date));

<DateField format='dd.MM.yyyy' separator='.' disabledDates={isWeekend}>
  <DateFieldInput aria-label='Delivery date' />
  <CalendarPopover />
</DateField>
```

### Edge: calendar popup in another locale

`locale` sets month and weekday names and the first day of the week in the calendar. The typed format still comes from `format`.

```tsx
<DateField format='dd.MM.yyyy' separator='.' locale='de-DE'>
  <DateFieldInput aria-label='Liefertermin' />
  <CalendarPopover />
</DateField>
```
