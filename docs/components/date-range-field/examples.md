# DateRangeField Examples

## Basic

### Basic: booking date range

Use this when users need one connected start and end date.

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

## Controlled/Stateful

### Controlled/Stateful: report range with explicit reset

Use a controlled wrapper when parent state needs to clear or synchronize the range.

```tsx
const [reportRange, setReportRange] = useState<[Date?, Date?]>([]);
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

<>
  <DateRangeField format='dd/MM/yyyy' separator='/' rangeSeparator=' - '>
    <DateRangeFieldInput />
    <Popover placement='bottom-end'>
      <PopoverTrigger asChild>
        <DateRangeFieldTriggerIconButton />
      </PopoverTrigger>
      <PopoverContent>
        <DateRangeFieldCalendar>{calendar}</DateRangeFieldCalendar>
      </PopoverContent>
    </Popover>
  </DateRangeField>
  <Button variant='secondary' onClick={() => setReportRange([])}>Clear range</Button>
</>
```

## Form/Integration

### Form/Integration: analytics filter row

Use this pattern for filters where the range belongs to a larger query form.

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

<FormRow label='Reporting period' hint='Used to filter export totals.'>
  <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' – '>
    <DateRangeFieldInput />
    <Popover placement='bottom-end'>
      <PopoverTrigger asChild>
        <DateRangeFieldTriggerIconButton />
      </PopoverTrigger>
      <PopoverContent>
        <DateRangeFieldCalendar>{calendar}</DateRangeFieldCalendar>
      </PopoverContent>
    </Popover>
  </DateRangeField>
</FormRow>
```

## Layout/Overlay

### Layout/Overlay: range picker inside a drawer

Use this when a filter drawer needs connected date range selection.

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

<Drawer>
  <DrawerTrigger asChild>
    <Button>Open filters</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent>
        <DateRangeField format='dd/MM/yyyy' separator='/' rangeSeparator=' - '>
          <DateRangeFieldInput />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTriggerIconButton />
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar>{calendar}</DateRangeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateRangeField>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Error

### Error: incomplete range in a filter form

Show explicit error state when only one side of the range is acceptable.

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

<FormRow label='Coverage period' error='Choose both a start and end date.'>
  <DateRangeField format='dd/MM/yyyy' separator='/' rangeSeparator=' - '>
    <DateRangeFieldInput aria-invalid='true' />
    <Popover placement='bottom-end'>
      <PopoverTrigger asChild>
        <DateRangeFieldTriggerIconButton />
      </PopoverTrigger>
      <PopoverContent>
        <DateRangeFieldCalendar>{calendar}</DateRangeFieldCalendar>
      </PopoverContent>
    </Popover>
  </DateRangeField>
</FormRow>
```

## Disabled

### Disabled: read-only report period

Use a disabled state when the chosen range is visible but locked.

```tsx
<DateRangeField format='dd/MM/yyyy' separator='/' rangeSeparator=' - ' disabled>
  <DateRangeFieldInput />
  <DateRangeFieldTriggerIconButton />
</DateRangeField>
```

## Edge

### Edge: blocked blackout dates

Use disabled-date rules when some ranges are structurally unavailable.

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

<DateRangeField
  format='dd/MM/yyyy'
  separator='/'
  rangeSeparator=' - '
  disabledDates={[
    new Date(2026, 5, 12),
    new Date(2026, 5, 13),
    new Date(2026, 5, 14),
  ]}
>
  <DateRangeFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateRangeFieldTriggerIconButton />
    </PopoverTrigger>
    <PopoverContent>
      <DateRangeFieldCalendar>{calendar}</DateRangeFieldCalendar>
    </PopoverContent>
  </Popover>
</DateRangeField>
```
