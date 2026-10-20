# Calendar Examples

## Basic

### Basic: single-date calendar

```tsx
<Calendar selection='single'>
  <CalendarHeader>
    <CalendarPrevYearGroupButton>
      <Icon><ArrowLeft /></Icon>
    </CalendarPrevYearGroupButton>
    <CalendarPrevButton>
      <Icon><ChevronLeft /></Icon>
    </CalendarPrevButton>
    <CalendarPickerButtonGroup>
      <CalendarMonthPickerButton>
        <CalendarMonthLabel />
      </CalendarMonthPickerButton>
      <CalendarYearPickerButton>
        <CalendarYearLabel />
      </CalendarYearPickerButton>
    </CalendarPickerButtonGroup>
    <CalendarNextButton>
      <Icon><ChevronRight /></Icon>
    </CalendarNextButton>
    <CalendarNextYearGroupButton>
      <Icon><ArrowRight /></Icon>
    </CalendarNextYearGroupButton>
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

## Controlled/Stateful

### Controlled/Stateful: multiple selection calendar

```tsx
<Calendar selection='multiple'>
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

### Controlled/Stateful: range selection with initial value

```tsx
<Calendar
  selection='range'
  value={['2026-04-09', '2026-04-11']}
>
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

## Form/Integration

### Form/Integration: calendar with custom day content

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

## Layout/Overlay

### Layout/Overlay: compact calendar

```tsx
<Calendar compact size='sm'>
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

## Error

### Error: constrained calendar with conflicting business rules

```tsx
<Calendar
  selection='single'
  min='2026-01-01'
  max='2026-12-31'
  disabledDates={['2026-04-10', '2026-04-11']}
>
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

## Disabled

### Disabled: calendar with disabled dates

```tsx
<Calendar
  disabledDates={['2026-04-10', '2026-04-11']}
>
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

## Edge

### Edge: custom day grid with excluded overflow days

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
