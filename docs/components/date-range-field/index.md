# DateRangeField

## Doc Profile

`advanced interactive`

## Summary

`DateRangeField` is a [compound component](../../glossary.md#compound-component) for connected start and end date entry that combines typed range input, optional calendar selection, and shared range validation. It is the field-first range layer when one business concept owns both dates.

## Imports

```tsx
import {
  DateRangeField,
  DateRangeFieldInput,
  DateRangeFieldCalendar,
  DateRangeFieldTriggerIconButton,
  type DateRangeFieldProps,
} from '@vega-ui/react';
```

## Exported Types

- `DateRangeFieldProps`
- `DateRangeFieldInputProps`
- `DateRangeFieldCalendarProps`
- `DateRangeFieldTriggerIconButtonProps`

## Minimal Composition

```tsx
<DateRangeField format='dd/MM/yyyy' separator='/' rangeSeparator=' - '>
  <DateRangeFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateRangeFieldTriggerIconButton />
    </PopoverTrigger>
    <PopoverContent>
      <DateRangeFieldCalendar>
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
      </DateRangeFieldCalendar>
    </PopoverContent>
  </Popover>
</DateRangeField>
```

## Required Parts

- `DateRangeField`: root state and range-format owner
- `DateRangeFieldInput`: typed range entry surface

## Optional Parts

- `DateRangeFieldTriggerIconButton`: calendar trigger affordance
- `DateRangeFieldCalendar`: visual range picker content, usually mounted in `Popover`

## Composition Order

1. `DateRangeField`
2. `DateRangeFieldInput`
3. `Popover`
4. `DateRangeFieldTriggerIconButton`
5. `DateRangeFieldCalendar`

## Variants

- Input-only versus input-plus-calendar composition
- Compact filter range versus fuller booking range flows
- Constraint-driven range state through `min`, `max`, and `disabledDates`

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Partial ranges are expected during editing and need explicit handling.
- Range semantics such as inclusive booking days or reporting cutoffs belong to the consumer.
- Overlay behavior should be tested inside filters, drawers, and other stacked layouts.
- Typed range parsing, visual blocked days, and final business validation should stay aligned instead of becoming separate rule systems.

## Common Mistakes

- Treating the start and end date as unrelated values.
- Leaving the meaning of the range ambiguous in labels or helper text.
- Relying on visual calendar blocking without matching validation rules.
