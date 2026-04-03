# DateTimeField Examples

## Basic

### Basic: event scheduler field

Use this when the stored value needs both a date and a time.

```tsx
<DateTimeField dateFormat='dd/MM/yyyy' dateSeparator='/' timeFormat='HH:MM'>
  <DateTimeFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateTimeFieldTriggerIconButton />
    </PopoverTrigger>
    <PopoverContent>
      <DateTimeFieldCalendar>
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
      </DateTimeFieldCalendar>
    </PopoverContent>
  </Popover>
</DateTimeField>
```

## Controlled/Stateful

### Controlled/Stateful: publish timestamp synced to parent flow

Use a controlled wrapper when parent state needs to reset or transform the timestamp before submit.

```tsx
const [publishAt, setPublishAt] = useState<Date | undefined>();
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
  <Button variant='secondary' onClick={() => setPublishAt(undefined)}>Clear</Button>
</>
```

## Form/Integration

### Form/Integration: release scheduling row

Use this for content publishing, reminders, or workflow approvals.

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
  <DateTimeField dateFormat='dd.MM.yyyy' dateSeparator='.' timeFormat='HH:MM'>
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

## Layout/Overlay

### Layout/Overlay: scheduler inside a sheet

Use this when scheduling belongs to a mobile-first overlay flow.

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

## Error

### Error: invalid timestamp in a form row

Use an explicit error state when typed input cannot be parsed into the required timestamp.

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

<FormRow label='Run at' error='Enter a valid date and time in dd/MM/yyyy, HH:MM format.'>
  <DateTimeField dateFormat='dd/MM/yyyy' dateSeparator='/' timeFormat='HH:MM'>
    <DateTimeFieldInput aria-invalid='true' />
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

## Disabled

### Disabled: locked execution time

Use `disabled` when the timestamp is visible but cannot be changed in the current state.

```tsx
<DateTimeField dateFormat='dd/MM/yyyy' dateSeparator='/' timeFormat='HH:MM' disabled>
  <DateTimeFieldInput />
  <DateTimeFieldTriggerIconButton />
</DateTimeField>
```

## Edge

### Edge: quarter-hour scheduling limits

Use time-step and constraint rules when the business model allows only certain schedule slots.

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

<DateTimeField
  dateFormat='dd/MM/yyyy'
  dateSeparator='/'
  timeFormat='HH:MM'
  timeStep={15}
  min={new Date(2026, 6, 1, 9, 0)}
  max={new Date(2026, 6, 31, 18, 0)}
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
```
