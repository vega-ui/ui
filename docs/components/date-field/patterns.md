# DateField Patterns

`CalendarPopover` in the snippets below is the local component from [Basic](./examples.md#basic): the trigger and `DateFieldCalendar` with the calendar parts inside a `Popover`.

## Date Field With Popover Calendar

When to use:

- A standard form field should allow both typing and picking.
- The calendar should appear on demand instead of staying visible.

Composition notes:

- Keep `DateFieldInput` as the primary surface and label it.
- Mount `DateFieldCalendar` inside `PopoverContent` and use `DateFieldTriggerIconButton` with an `aria-label` as the trigger.

Trade-offs:

- Saves layout space.
- Requires overlay testing inside dialogs, drawers, and scroll containers.

```tsx
<>
  <Label htmlFor='start-date'>Start date</Label>
  <DateField format='dd.MM.yyyy' separator='.'>
    <DateFieldInput id='start-date' />
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
  </DateField>
</>
```

## Date Field In Validation-Heavy Forms

When to use:

- The date must participate in submit validation.
- Error copy and helper text matter more than visual calendar exploration.

Composition notes:

- Use native `required` and `pattern` on `DateFieldInput` for presence and completeness; `min` and `max` are already enforced while typing.
- `disabledDates` is enforced only in the calendar, so repeat that rule in submit validation.
- Show the error with `error` on the root and `HelperText error`, linked through `aria-describedby`.

Trade-offs:

- Native constraint validation with no extra library.
- The submitted value is the typed text, so the server or submit handler parses it.

```tsx
<form>
  <Label htmlFor='contract-start'>Contract start</Label>
  <DateField format='dd.MM.yyyy' separator='.' min='2026-01-01'>
    <DateFieldInput
      id='contract-start'
      name='contractStart'
      required
      pattern='\d{2}\.\d{2}\.\d{4}'
      aria-describedby='contract-start-hint'
    />
    <CalendarPopover />
  </DateField>
  <HelperText id='contract-start-hint'>dd.mm.yyyy, from 1 January 2026.</HelperText>
  <Button type='submit'>Continue</Button>
</form>
```

## Date Field Inside Modal Workflows

When to use:

- Scheduling or review flows live inside `Dialog`, `Drawer`, or `Sheet`.
- The calendar still needs on-demand access.

Composition notes:

- Test focus, dismissal, and stacking with the parent overlay.
- Keep the calendar compact enough for the parent container.

Trade-offs:

- Preserves the existing modal flow.
- Increases overlay coordination complexity.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Reschedule</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent>
        <DrawerTitle>Reschedule</DrawerTitle>
        <Label htmlFor='new-date'>New date</Label>
        <DateField format='dd.MM.yyyy' separator='.'>
          <DateFieldInput id='new-date' />
          <CalendarPopover />
        </DateField>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Date Field In A Non-Gregorian Calendar

When to use:

- Users type and read dates in a Persian, Hebrew, Japanese, Buddhist, Islamic, or other calendar.

Composition notes:

- Create the calendar once with `createCalendarSystem`, outside the component (see [Dates And Calendar Systems](../../i18n.md#calendar-system-adapter)), and pass it to the `calendar` prop of the root, together with `locale`.
- Typing is validated in that calendar, for example day 31 of Persian month 6 or Hebrew month 13; `min` and `max` stay ISO `YYYY-MM-DD` strings.

Trade-offs:

- Native month lengths and leap months without changing the stored value.
- Month lengths and eras come from the `Intl` data of the runtime.

```tsx
const persianCalendar = createCalendarSystem('persian');

<DateField format='yyyy/MM/dd' separator='/' min='2026-03-21' locale='fa-IR' calendar={persianCalendar}>
  <DateFieldInput aria-label='تاریخ' />
  <CalendarPopover />
</DateField>
```
