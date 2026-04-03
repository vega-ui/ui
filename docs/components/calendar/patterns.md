# Calendar Patterns

## Embedded Booking Calendar

When to use:

users need a visible date surface inside a booking or pricing flow.

Composition notes:

Keep the calendar compact when embedded and use custom day content for pricing or availability hints.

Trade-offs:

High visual clarity, but a larger footprint than field-based date input.

```tsx
<Calendar compact>
  <CalendarHeader>
    <CalendarPrevButton><Icon><ChevronLeft /></Icon></CalendarPrevButton>
    <CalendarPickerButtonGroup>
      <CalendarMonthPickerButton><CalendarMonthLabel /></CalendarMonthPickerButton>
      <CalendarYearPickerButton><CalendarYearLabel /></CalendarYearPickerButton>
    </CalendarPickerButtonGroup>
    <CalendarNextButton><Icon><ChevronRight /></Icon></CalendarNextButton>
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
          <CalendarDayPickerRowGroup>
            <CustomDatesGrid />
          </CalendarDayPickerRowGroup>
        </CalendarDayPickerScrollerContent>
      </CalendarDayPickerScroller>
    </CalendarDayPicker>
  </CalendarContent>
</Calendar>
```

## Range Selection

When to use:

users pick a start and end date together.

Composition notes:

Use `selection='range'` and validate disabled or blocked days against range logic.

Trade-offs:

Direct visual feedback, but more edge cases around blocked or partial ranges.

```tsx
<Calendar selection='range'>
  <CalendarHeader>
    <CalendarPrevButton><Icon><ChevronLeft /></Icon></CalendarPrevButton>
    <CalendarPickerButtonGroup>
      <CalendarMonthPickerButton><CalendarMonthLabel /></CalendarMonthPickerButton>
      <CalendarYearPickerButton><CalendarYearLabel /></CalendarYearPickerButton>
    </CalendarPickerButtonGroup>
    <CalendarNextButton><Icon><ChevronRight /></Icon></CalendarNextButton>
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
</Calendar>
```

## Day-Cell Custom Rendering

When to use:

dates need extra content such as price, status, or availability.

Composition notes:

Keep the date cell readable as one interactive unit and preserve disabled plus excluded behavior.

Trade-offs:

Richer scanability, but higher accessibility and keyboard risk.

```tsx
<Calendar compact>
  <CalendarHeader>
    <CalendarPrevButton><Icon><ChevronLeft /></Icon></CalendarPrevButton>
    <CalendarPickerButtonGroup>
      <CalendarMonthPickerButton><CalendarMonthLabel /></CalendarMonthPickerButton>
      <CalendarYearPickerButton><CalendarYearLabel /></CalendarYearPickerButton>
    </CalendarPickerButtonGroup>
    <CalendarNextButton><Icon><ChevronRight /></Icon></CalendarNextButton>
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
          <CalendarDayPickerRowGroup>
            <CustomDatesGrid />
          </CalendarDayPickerRowGroup>
        </CalendarDayPickerScrollerContent>
      </CalendarDayPickerScroller>
    </CalendarDayPicker>
  </CalendarContent>
</Calendar>
```
