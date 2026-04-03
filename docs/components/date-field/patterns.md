# DateField Patterns

## Date Field With Popover Calendar

When to use:

- A standard form field should allow both typing and picking.
- The calendar should appear on demand instead of staying visible.

Composition notes:

- Keep `DateFieldInput` as the primary surface.
- Mount `DateFieldCalendar` inside `PopoverContent` and use `DateFieldTriggerIconButton` as the trigger.

Trade-offs:

- Saves layout space.
- Requires overlay testing inside dialogs, drawers, and scroll containers.

```tsx
const calendar = (
  <>
    <CalendarHeader>
      <CalendarPrevYearGroupButton><Icon><ArrowLeft /></Icon></CalendarPrevYearGroupButton>
      <CalendarPrevButton><Icon><ChevronLeft /></Icon></CalendarPrevButton>
      <CalendarPickerButtonGroup>
        <CalendarMonthPickerButton><CalendarMonthLabel /></CalendarMonthPickerButton>
        <CalendarYearPickerButton><CalendarYearLabel /></CalendarYearPickerButton>
      </CalendarPickerButtonGroup>
      <CalendarNextButton><Icon><ChevronRight /></Icon></CalendarNextButton>
      <CalendarNextYearGroupButton><Icon><ArrowRight /></Icon></CalendarNextYearGroupButton>
    </CalendarHeader>
    <CalendarContent>
      <CalendarDayPicker>
        <CalendarWeekLabels>
          {getWeekDayNames(navigator.language, 'short').map((name) => (
            <CalendarWeekLabel key={name}>{name}</CalendarWeekLabel>
          ))}
        </CalendarWeekLabels>
        <CalendarDayPickerScroller>
          <CalendarDayPickerScrollerContent>
            <CalendarDayPickerScrollerLayout />
          </CalendarDayPickerScrollerContent>
        </CalendarDayPickerScroller>
      </CalendarDayPicker>
      <CalendarMonthPicker>
        <CalendarMonthPickerLayout />
      </CalendarMonthPicker>
      <CalendarYearPicker>
        <CalendarYearPickerScroller>
          <CalendarYearPickerScrollerContent>
            <CalendarYearPickerScrollerLayout />
          </CalendarYearPickerScrollerContent>
        </CalendarYearPickerScroller>
      </CalendarYearPicker>
    </CalendarContent>
  </>
);

<DateField format='dd/MM/yyyy' separator='/'>
  <DateFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateFieldTriggerIconButton />
    </PopoverTrigger>
    <PopoverContent>
      <DateFieldCalendar>{calendar}</DateFieldCalendar>
    </PopoverContent>
  </Popover>
</DateField>
```

## Date Field In Validation-Heavy Forms

When to use:

- The date must participate in submit validation.
- Error copy and helper text matter more than visual calendar exploration.

Composition notes:

- Keep error and helper text at the form-row level.
- Treat `min`, `max`, and `disabledDates` as shared validation rules.

Trade-offs:

- More explicit validation.
- Requires disciplined copy for format and invalid-state guidance.

```tsx
const calendar = (
  <>
    <CalendarHeader>
      <CalendarPrevYearGroupButton><Icon><ArrowLeft /></Icon></CalendarPrevYearGroupButton>
      <CalendarPrevButton><Icon><ChevronLeft /></Icon></CalendarPrevButton>
      <CalendarPickerButtonGroup>
        <CalendarMonthPickerButton><CalendarMonthLabel /></CalendarMonthPickerButton>
        <CalendarYearPickerButton><CalendarYearLabel /></CalendarYearPickerButton>
      </CalendarPickerButtonGroup>
      <CalendarNextButton><Icon><ChevronRight /></Icon></CalendarNextButton>
      <CalendarNextYearGroupButton><Icon><ArrowRight /></Icon></CalendarNextYearGroupButton>
    </CalendarHeader>
    <CalendarContent>
      <CalendarDayPicker>
        <CalendarWeekLabels>
          {getWeekDayNames(navigator.language, 'short').map((name) => (
            <CalendarWeekLabel key={name}>{name}</CalendarWeekLabel>
          ))}
        </CalendarWeekLabels>
        <CalendarDayPickerScroller>
          <CalendarDayPickerScrollerContent>
            <CalendarDayPickerScrollerLayout />
          </CalendarDayPickerScrollerContent>
        </CalendarDayPickerScroller>
      </CalendarDayPicker>
      <CalendarMonthPicker>
        <CalendarMonthPickerLayout />
      </CalendarMonthPicker>
      <CalendarYearPicker>
        <CalendarYearPickerScroller>
          <CalendarYearPickerScrollerContent>
            <CalendarYearPickerScrollerLayout />
          </CalendarYearPickerScrollerContent>
        </CalendarYearPickerScroller>
      </CalendarYearPicker>
    </CalendarContent>
  </>
);

<FormRow label='Contract start' error='Enter a valid future date.'>
  <DateField format='dd.MM.yyyy' separator='.' min={new Date()}>
    <DateFieldInput aria-invalid='true' />
    <Popover placement='bottom-end'>
      <PopoverTrigger asChild>
        <DateFieldTriggerIconButton />
      </PopoverTrigger>
      <PopoverContent>
        <DateFieldCalendar>{calendar}</DateFieldCalendar>
      </PopoverContent>
    </Popover>
  </DateField>
</FormRow>
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
const calendar = (
  <>
    <CalendarHeader>
      <CalendarPrevYearGroupButton><Icon><ArrowLeft /></Icon></CalendarPrevYearGroupButton>
      <CalendarPrevButton><Icon><ChevronLeft /></Icon></CalendarPrevButton>
      <CalendarPickerButtonGroup>
        <CalendarMonthPickerButton><CalendarMonthLabel /></CalendarMonthPickerButton>
        <CalendarYearPickerButton><CalendarYearLabel /></CalendarYearPickerButton>
      </CalendarPickerButtonGroup>
      <CalendarNextButton><Icon><ChevronRight /></Icon></CalendarNextButton>
      <CalendarNextYearGroupButton><Icon><ArrowRight /></Icon></CalendarNextYearGroupButton>
    </CalendarHeader>
    <CalendarContent>
      <CalendarDayPicker>
        <CalendarWeekLabels>
          {getWeekDayNames(navigator.language, 'short').map((name) => (
            <CalendarWeekLabel key={name}>{name}</CalendarWeekLabel>
          ))}
        </CalendarWeekLabels>
        <CalendarDayPickerScroller>
          <CalendarDayPickerScrollerContent>
            <CalendarDayPickerScrollerLayout />
          </CalendarDayPickerScrollerContent>
        </CalendarDayPickerScroller>
      </CalendarDayPicker>
      <CalendarMonthPicker>
        <CalendarMonthPickerLayout />
      </CalendarMonthPicker>
      <CalendarYearPicker>
        <CalendarYearPickerScroller>
          <CalendarYearPickerScrollerContent>
            <CalendarYearPickerScrollerLayout />
          </CalendarYearPickerScrollerContent>
        </CalendarYearPickerScroller>
      </CalendarYearPicker>
    </CalendarContent>
  </>
);

<Dialog>
  <DialogTrigger asChild>
    <Button>Schedule review</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DateField format='dd/MM/yyyy' separator='/'>
          <DateFieldInput />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar>{calendar}</DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```
