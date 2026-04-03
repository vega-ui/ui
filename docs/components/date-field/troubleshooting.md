# DateField Troubleshooting

## Calendar Button Opens Nothing

### Symptom

The trigger icon button renders, but clicking it never shows a calendar.

### Likely Cause

`DateFieldTriggerIconButton` was rendered without a surrounding `Popover` or without `DateFieldCalendar` inside the overlay.

### How To Verify

- Check whether the trigger is wrapped in `PopoverTrigger`.
- Check whether `PopoverContent` contains `DateFieldCalendar`.

### Fix

Compose the trigger and calendar through `Popover`.

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

## Typed Value Looks Wrong

### Symptom

The input format shown to users does not match parsing behavior.

### Likely Cause

`format` or `separator` does not match the date copy used in labels, hints, and validation messages.

### How To Verify

- Compare the configured `format` with the visible form hint.
- Type a representative value and inspect how it is interpreted.

### Fix

Keep visible guidance, parsing rules, and validation copy aligned around the same format.

## Min And Max Look Enforced In The Calendar But Not In Product Logic

### Symptom

The picker blocks some dates, but submit logic or API payload preparation still accepts them.

### Likely Cause

Date constraints were treated as visual calendar rules instead of shared product validation.

### How To Verify

- Submit an out-of-range value through the form flow.
- Compare UI rules with server or submit validation.

### Fix

Apply the same date constraints in both UI composition and final validation.
