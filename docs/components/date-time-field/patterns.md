# DateTimeField Patterns

`CalendarPopover` in the snippets below is the local component from [Basic](./examples.md#basic): the trigger and `DateTimeFieldCalendar` with the calendar parts inside a `Popover`.

## Timestamp Field With Popover Calendar

When to use:

- Users need one field that captures both date and time.
- The calendar should open on demand instead of staying visible.

Composition notes:

- Keep `DateTimeFieldInput` as the primary surface and label it.
- Mount `DateTimeFieldCalendar` inside `PopoverContent`; picking a day keeps the typed time.

Trade-offs:

- Keeps the form compact.
- Requires clear formatting and timezone guidance.

```tsx
<>
  <Label htmlFor='starts-at'>Starts at</Label>
  <DateTimeField dateFormat='dd.MM.yyyy'>
    <DateTimeFieldInput id='starts-at' />
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
  </DateTimeField>
</>
```

## Timestamp Field In Scheduling Forms

When to use:

- Publishing, reminders, or execution schedules depend on one timestamp.
- Validation and serialization happen close to submit.

Composition notes:

- Keep helper text explicit about timezone and expected format.
- Align `min`, `max`, and `timeStep` with scheduling business rules; `min` and `max` clamp typed values, `timeStep` only drives arrow-key stepping.
- The submitted value is the typed text; parse it with `parseTemplateDate` before sending.

Trade-offs:

- Strong timestamp control in one field row.
- More validation and copy complexity than a plain date field.

```tsx
<form>
  <Label htmlFor='publish-at'>Publish at</Label>
  <DateTimeField dateFormat='dd.MM.yyyy' timeStep={15} min='2026-07-01T00:00'>
    <DateTimeFieldInput
      id='publish-at'
      name='publishAt'
      required
      pattern='\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}'
      aria-describedby='publish-at-hint'
    />
    <CalendarPopover />
  </DateTimeField>
  <HelperText id='publish-at-hint'>dd.mm.yyyy, hh:mm in the workspace timezone.</HelperText>
  <Button type='submit'>Schedule</Button>
</form>
```

## Timestamp Field Inside Mobile-First Sheets

When to use:

- Scheduling happens inside `Sheet` or another constrained overlay.
- The user still needs a calendar affordance.

Composition notes:

- Test popover placement and scrolling inside the parent overlay.
- Keep the field concise enough for narrow layouts.

Trade-offs:

- Preserves modal context.
- Increases overlay and focus coordination complexity.

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Reschedule</Button>
  </SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent>
        <Label htmlFor='new-time'>New time</Label>
        <DateTimeField dateFormat='dd.MM.yyyy'>
          <DateTimeFieldInput id='new-time' />
          <CalendarPopover />
        </DateTimeField>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```
