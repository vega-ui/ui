import { useId, useRef, useState, type FormEvent } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Button,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  Card,
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Separator,
  Switch,
  SwitchIndicator,
  SwitchInput,
  Text,
} from '@vega-ui/react';
import { Plus, Trash2 } from '@vega-ui/icons';
import './availability.css';

const days = [
  { value: 'mon', short: 'Mon', name: 'Monday' },
  { value: 'tue', short: 'Tue', name: 'Tuesday' },
  { value: 'wed', short: 'Wed', name: 'Wednesday' },
  { value: 'thu', short: 'Thu', name: 'Thursday' },
  { value: 'fri', short: 'Fri', name: 'Friday' },
  { value: 'sat', short: 'Sat', name: 'Saturday' },
  { value: 'sun', short: 'Sun', name: 'Sunday' },
];

const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri'];
const busy = ['tue-12', 'tue-13', 'wed-9', 'thu-15', 'thu-16'];

const timezones = [
  { value: 'Europe/Berlin', label: 'Berlin (CET)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'America/New_York', label: 'New York (ET)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PT)' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
];

const hourLabel = new Intl.DateTimeFormat('en-US', { hour: 'numeric', timeZone: 'UTC' });
const dateLabel = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

const formatHour = (hour: number) => hourLabel.format(Date.UTC(2026, 0, 1, hour));

const makeSlots = (dayValues: string[], from: number, to: number) => dayValues
  .flatMap((day) => hours.filter((hour) => hour >= from && hour < to).map((hour) => `${day}-${hour}`))
  .filter((key) => !busy.includes(key));

const presets = [
  { label: 'Weekdays 9–5', slots: makeSlots(weekdays, 9, 17) },
  { label: 'Mornings', slots: makeSlots(weekdays, 8, 12) },
  { label: 'Clear', slots: [] },
];

const describeHours = (slots: string[]) => {
  const count = new Set(slots.map((key) => key.split('-')[0])).size;
  const hoursText = `${slots.length} ${slots.length === 1 ? 'hour' : 'hours'}`;
  const daysText = `${count} ${count === 1 ? 'day' : 'days'}`;

  return `${hoursText} across ${daysText}`;
};

interface Exception {
  key: number
  date: string
  unavailable: boolean
}

type ExceptionErrors = Record<number, string>;

const validateExceptions = (exceptions: Exception[]) => {
  const errors: ExceptionErrors = {};

  exceptions.forEach((item, index) => {
    if (item.date === '') {
      errors[item.key] = 'Enter a date or remove this row.';
      return;
    }

    if (exceptions.findIndex((other) => other.date === item.date) < index) errors[item.key] = 'This date is already in the list.';
  });

  return errors;
};

const field = { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const legend = { display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-3)' } as const;

export default function Availability() {
  const id = useId();
  const gridRef = useRef<HTMLDivElement>(null);
  const nextKey = useRef(2);
  const [slots, setSlots] = useState<string[]>(presets[0].slots);
  const [timezone, setTimezone] = useState<string | null>('Europe/Berlin');
  const [exceptions, setExceptions] = useState<Exception[]>([{ key: 1, date: '2026-12-24', unavailable: true }]);
  const [slotsError, setSlotsError] = useState(false);
  const [exceptionErrors, setExceptionErrors] = useState<ExceptionErrors>({});
  const [saved, setSaved] = useState(false);

  const changeSlots = (next: string[]) => {
    setSlots(next);
    setSlotsError(false);
    setSaved(false);
  };

  const changeException = (key: number, patch: Partial<Exception>) => {
    setExceptions(exceptions.map((item) => item.key === key ? { ...item, ...patch } : item));
    setExceptionErrors({ ...exceptionErrors, [key]: '' });
    setSaved(false);
  };

  const addException = () => {
    setExceptions([...exceptions, { key: nextKey.current, date: '', unavailable: true }]);
    nextKey.current += 1;
    setSaved(false);
  };

  const removeException = (key: number) => {
    setExceptions(exceptions.filter((item) => item.key !== key));
    setSaved(false);
  };

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const errors = validateExceptions(exceptions);
    const invalid = exceptions.find((item) => errors[item.key]);

    setSlotsError(slots.length === 0);
    setExceptionErrors(errors);

    if (slots.length === 0) {
      gridRef.current?.querySelector<HTMLElement>('[role="gridcell"][tabindex="0"]')?.focus();
      return;
    }

    if (invalid) {
      const input = form.elements.namedItem(`exception-${invalid.key}`);
      if (input instanceof HTMLElement) input.focus();
      return;
    }

    setSaved(true);
  };

  const timezoneLabel = timezones.find((item) => item.value === timezone)?.label ?? '';

  return (
    <form noValidate aria-labelledby={`${id}-title`} onSubmit={save} style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <header style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading id={`${id}-title`} as='h1' size={7} fontWeight={700}>Availability</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Pick the hours people can book with you each week.</Text>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'var(--spacing-16)' }}>
        <Card style={{ alignItems: 'stretch', gap: 'var(--spacing-10)', flex: '999 1 480px', minWidth: 0 }} aria-labelledby={`${id}-weekly`}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4) var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <Heading id={`${id}-weekly`} as='h2' size={4} fontWeight={600}>Weekly hours</Heading>
              <Text id={`${id}-summary`} size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                {slots.length === 0 ? 'No hours selected' : describeHours(slots)}
              </Text>
            </div>
            <div role='group' aria-label='Presets' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
              {presets.map((preset) => (
                <Button key={preset.label} type='button' size='xs' variant='secondary' appearance='ghost' onClick={() => changeSlots(preset.slots)}>
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <DataGridSelectable
              ref={gridRef}
              aria-labelledby={`${id}-weekly`}
              aria-describedby={slotsError ? `${id}-slots-error ${id}-hint` : `${id}-hint`}
              aria-multiselectable='true'
              selection='multiple'
              selected={slots}
              onSelectCell={changeSlots}
              disabled={busy}
              defaultActive='mon-9'
              className='availabilityGrid'
            >
              <DataGridSelectableRowGroup>
                <DataGridSelectableRow row={0}>
                  <div role='columnheader' aria-label='Time' />
                  {days.map((day) => <div key={day.value} role='columnheader' aria-label={day.name}>{day.short}</div>)}
                </DataGridSelectableRow>
              </DataGridSelectableRowGroup>
              <DataGridSelectableRowGroup>
                {hours.map((hour, row) => (
                  <DataGridSelectableRow key={hour} row={row + 1}>
                    <div role='rowheader'>{formatHour(hour)}</div>
                    {days.map((day, col) => {
                      const key = `${day.value}-${hour}`;
                      const label = `${day.name}, ${formatHour(hour)} to ${formatHour(hour + 1)}`;

                      return <DataGridSelectableCell key={key} col={col} cellKey={key} aria-label={busy.includes(key) ? `${label}, busy` : label} />;
                    })}
                  </DataGridSelectableRow>
                ))}
              </DataGridSelectableRowGroup>
            </DataGridSelectable>
            {slotsError && <HelperText id={`${id}-slots-error`} error>Pick at least one hour, or use a preset.</HelperText>}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4) var(--spacing-10)' }}>
            <Text size={2} style={{ ...legend, color: 'var(--label-secondary)' }}>
              <span className='availabilityLegend' style={{ background: 'var(--color-primary-500)' }} />
              Available
            </Text>
            <Text size={2} style={{ ...legend, color: 'var(--label-secondary)' }}>
              <span className='availabilityLegend availabilityBusy' />
              Busy in Google Calendar
            </Text>
          </div>
          <HelperText id={`${id}-hint`}>Click an hour to toggle it. With the keyboard, move with the arrow keys and press Space.</HelperText>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-12)', flex: '1 1 300px', minWidth: 0 }}>
          <Card style={{ alignItems: 'stretch', gap: 'var(--spacing-8)' }}>
            <div style={field}>
              <Label htmlFor={`${id}-timezone`}>Time zone</Label>
              <Select value={timezone} onChangeValue={(next) => setTimezone(next ?? null)}>
                <SelectHiddenSelect name='timezone' />
                <SelectCombobox id={`${id}-timezone`}>
                  <SelectValue placeholder='Choose a time zone' />
                  <SelectIcon />
                </SelectCombobox>
                <SelectListbox>
                  {timezones.map((item) => (
                    <SelectOption key={item.value} value={item.value}>{item.label}</SelectOption>
                  ))}
                </SelectListbox>
              </Select>
              <HelperText>The weekly grid uses this time zone.</HelperText>
            </div>
          </Card>

          <Card style={{ alignItems: 'stretch', gap: 'var(--spacing-8)' }} aria-labelledby={`${id}-exceptions`}>
            <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <Heading id={`${id}-exceptions`} as='h2' size={4} fontWeight={600}>Date exceptions</Heading>
              <Text size={2} style={{ color: 'var(--label-secondary)' }}>Days that differ from your weekly hours.</Text>
            </div>

            {exceptions.length > 0 && (
              <ul style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none' }}>
                {exceptions.map((item, index) => {
                  const error = exceptionErrors[item.key];
                  const name = item.date === '' ? `exception ${index + 1}` : dateLabel.format(Date.parse(item.date));

                  return (
                    <li key={item.key} style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
                      {index > 0 && <Separator style={{ marginBlockEnd: 'var(--spacing-4)' }} />}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                        <DateField
                          size='xs'
                          format='MM/dd/yyyy'
                          separator='/'
                          min='2026-11-01'
                          error={Boolean(error)}
                          value={item.date}
                          onChangeValue={(date) => changeException(item.key, { date })}
                          style={{ flex: 1, minWidth: 0 }}
                        >
                          <DateFieldInput
                            name={`exception-${item.key}`}
                            placeholder='mm/dd/yyyy'
                            aria-label={`Exception ${index + 1} date`}
                            aria-invalid={Boolean(error)}
                            aria-describedby={error ? `${id}-exception-${item.key}-error` : undefined}
                          />
                          <Popover placement='bottom-end'>
                            <PopoverTrigger asChild>
                              <DateFieldTriggerIconButton aria-label={`Choose exception ${index + 1} date`} />
                            </PopoverTrigger>
                            <PopoverContent>
                              <DateFieldCalendar>
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
                              </DateFieldCalendar>
                            </PopoverContent>
                          </Popover>
                        </DateField>
                        <IconButton size='xs' type='button' variant='secondary' appearance='ghost' aria-label={`Remove ${name}`} onClick={() => removeException(item.key)} style={{ flexShrink: 0 }}>
                          <Icon size='xs'><Trash2 /></Icon>
                        </IconButton>
                      </div>
                      {error && <HelperText id={`${id}-exception-${item.key}-error`} error>{error}</HelperText>}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                        <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
                          <Label htmlFor={`${id}-unavailable-${item.key}`}>Unavailable all day</Label>
                          <Text id={`${id}-unavailable-${item.key}-hint`} size={2} style={{ color: 'var(--label-secondary)' }}>
                            {item.unavailable ? 'No one can book this day.' : 'Weekly hours apply.'}
                          </Text>
                        </div>
                        <Switch style={{ flexShrink: 0 }}>
                          <SwitchInput
                            id={`${id}-unavailable-${item.key}`}
                            checked={item.unavailable}
                            aria-describedby={`${id}-unavailable-${item.key}-hint`}
                            onChange={(event) => changeException(item.key, { unavailable: event.currentTarget.checked })}
                          />
                          <SwitchIndicator />
                        </Switch>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <Button size='xs' type='button' variant='secondary' appearance='ghost' onClick={addException} style={{ alignSelf: 'flex-start', gap: 'var(--spacing-3)' }}>
              <Icon size='xs' aria-hidden='true'><Plus /></Icon>
              Add a date
            </Button>
          </Card>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        {saved && (
          <Alert variant='success'>
            <AlertIcon />
            <AlertMain>
              <AlertTitle>Availability saved</AlertTitle>
              <AlertContent>{`${describeHours(slots)} a week, shown in ${timezoneLabel}. New bookings follow these hours right away.`}</AlertContent>
            </AlertMain>
          </Alert>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <Button size='xs' type='submit'>Save availability</Button>
        </div>
      </div>
    </form>
  );
}
