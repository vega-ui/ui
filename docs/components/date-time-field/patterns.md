# DateTimeField Patterns

## Timestamp Field With Popover Calendar

When to use:

- Users need one field that captures both date and time.
- The calendar should open on demand instead of staying visible.

Composition notes:

- Keep `DateTimeFieldInput` as the primary surface.
- Mount `DateTimeFieldCalendar` inside `PopoverContent`.

Trade-offs:

- Keeps the form compact.
- Requires clear formatting and timezone guidance.

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

<DateTimeField dateFormat='dd/MM/yyyy' dateSeparator='/' timeFormat='HH:MM'>
  <DateTimeFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateTimeFieldTriggerIconButton />
    </PopoverTrigger>
    <PopoverContent>
      <DateTimeFieldCalendar>{calendar}</DateTimeFieldCalendar>
    </PopoverContent>
  </Popover>
</DateTimeField>
```

## Timestamp Field In Scheduling Forms

When to use:

- Publishing, reminders, or execution schedules depend on one timestamp.
- Validation and serialization happen close to submit.

Composition notes:

- Keep helper text explicit about timezone and expected format.
- Align `min`, `max`, and `timeStep` with scheduling business rules.

Trade-offs:

- Strong timestamp control in one field row.
- More validation and copy complexity than a plain date field.

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

<FormRow label='Publish at' hint='Stored in the workspace timezone.'>
  <DateTimeField
    dateFormat='dd.MM.yyyy'
    dateSeparator='.'
    timeFormat='HH:MM'
    timeStep={15}
  >
    <DateTimeFieldInput />
    <Popover placement='bottom-end'>
      <PopoverTrigger asChild>
        <DateTimeFieldTriggerIconButton />
      </PopoverTrigger>
      <PopoverContent>
        <DateTimeFieldCalendar>{calendar}</DateTimeFieldCalendar>
      </PopoverContent>
    </Popover>
  </DateTimeField>
</FormRow>
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

<Sheet>
  <SheetTrigger asChild>
    <Button>Reschedule</Button>
  </SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent>
        <DateTimeField dateFormat='dd/MM/yyyy' dateSeparator='/' timeFormat='HH:MM'>
          <DateTimeFieldInput />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTriggerIconButton />
            </PopoverTrigger>
            <PopoverContent>
              <DateTimeFieldCalendar>{calendar}</DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```
