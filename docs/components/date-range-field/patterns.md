# DateRangeField Patterns

`CalendarPopover` in the snippets below is the local component from [Basic](./examples.md#basic): the trigger and `DateRangeFieldCalendar` with the calendar parts inside a `Popover`.

## Range Field With Popover Calendar

When to use:

- Users need one connected range field in a form or filter bar.
- The range picker should open on demand.

Composition notes:

- Keep `DateRangeFieldInput` as the primary entry surface and label it.
- Mount `DateRangeFieldCalendar` inside `PopoverContent`; the first picked day writes the start, the second the end.

Trade-offs:

- Saves layout space.
- Requires explicit incomplete-range handling: a single date is a valid entry.

```tsx
<>
  <Label htmlFor='stay'>Stay</Label>
  <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' - '>
    <DateRangeFieldInput id='stay' />
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
  </DateRangeField>
</>
```

## Range Field In Filter Drawers

When to use:

- Reporting or analytics filters live inside `Drawer` or `Sheet`.
- The range is one of several stacked filters.

Composition notes:

- Keep the field compact and explicit about range semantics.
- Test popover placement inside the parent overlay.

Trade-offs:

- Works well in dense filter UIs.
- Adds overlay coordination complexity.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Filters</Button>
  </DrawerTrigger>
  <DrawerContent aria-labelledby='filters-title'>
    <Heading id='filters-title' as='h2' size={4} fontWeight={600}>Filters</Heading>
    <Label htmlFor='created'>Created</Label>
    <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' - '>
      <DateRangeFieldInput id='created' name='created' />
      <CalendarPopover />
    </DateRangeField>
  </DrawerContent>
</Drawer>
```

## Range Field For Validation-Heavy Reporting Forms

When to use:

- The range is required before export or report generation.
- The product needs explicit error copy for incomplete or blocked ranges.

Composition notes:

- Use native `required` and a `pattern` for the full range; `min` and `max` are already enforced while typing, and a reversed range is swapped.
- `disabledDates` applies only to the calendar, so align it with backend reporting rules and repeat it on submit.

Trade-offs:

- Stronger validation clarity.
- The submitted value is the typed text, so the submit handler splits and parses it.

```tsx
<form>
  <Label htmlFor='quarter'>Reporting period</Label>
  <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' - ' min='2026-07-01' max='2026-09-30'>
    <DateRangeFieldInput
      id='quarter'
      name='period'
      required
      pattern='\d{2}\.\d{2}\.\d{4} - \d{2}\.\d{2}\.\d{4}'
      aria-describedby='quarter-hint'
    />
    <CalendarPopover />
  </DateRangeField>
  <HelperText id='quarter-hint'>Both dates inside the third quarter of 2026.</HelperText>
  <Button type='submit'>Export</Button>
</form>
```
