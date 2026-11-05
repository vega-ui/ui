import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import {
  Avatar,
  AvatarFallback,
  Button,
  Calendar,
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
  Heading,
  HelperText,
  Icon,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Separator,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { CalendarDays as CalendarIcon, CircleCheck, Clock, Globe, Video } from '@vega-ui/icons';

const HOST_ZONE = 'Europe/Berlin';
const FIRST_DAY = '2026-11-09';
const LAST_DAY = '2026-12-23';
const FULLY_BOOKED = ['2026-11-11', '2026-11-19', '2026-12-02'];
const lengths = [15, 30, 60];

const timezones = [
  { value: 'Europe/Berlin', label: 'Berlin (CET)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'America/New_York', label: 'New York (ET)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PT)' },
];

const dayTitle = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });

const field = { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const meta = { display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', color: 'var(--label-secondary)' } as const;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isUnavailable = (date: string) => {
  const weekday = new Date(date).getUTCDay();
  if (weekday === 0 || weekday === 6) return true;

  return FULLY_BOOKED.includes(date);
};

const zoneOffset = (timeZone: string, instant: number) => {
  const name = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
    .formatToParts(instant)
    .find((part) => part.type === 'timeZoneName')?.value ?? '';
  const match = name.match(/([+-])(\d{2}):(\d{2})/);
  if (!match) return 0;

  const minutes = Number(match[2]) * 60 + Number(match[3]);

  return match[1] === '-' ? -minutes : minutes;
};

const getSlots = (date: string, length: number) => {
  const midnight = Date.parse(date);
  const offset = zoneOffset(HOST_ZONE, midnight + 12 * 3_600_000);
  const day = new Date(date).getUTCDate();
  const slots: number[] = [];

  for (let minutes = 9 * 60; minutes + length <= 17 * 60; minutes += length) {
    if (minutes === 12 * 60 || (day + minutes / length) % 4 === 0) continue;
    slots.push(midnight + (minutes - offset) * 60_000);
  }

  return slots;
};

const compact = (instant: number) => new Date(instant).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

const calendarLinks = (start: number, end: number, title: string) => {
  const text = encodeURIComponent(title);
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${compact(start)}`,
    `DTEND:${compact(end)}`,
    `SUMMARY:${title}`,
    'LOCATION:Google Meet',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${compact(start)}/${compact(end)}`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${text}&startdt=${new Date(start).toISOString()}&enddt=${new Date(end).toISOString()}`,
    ics: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`,
  };
};

type Step = 'pick' | 'details' | 'done';
type Errors = Partial<Record<string, string>>;

const validateDetails = (data: FormData) => {
  const errors: Errors = {};
  const name = String(data.get('name')).trim();
  const email = String(data.get('email')).trim();
  const guests = String(data.get('guests')).split(',').map((guest) => guest.trim()).filter((guest) => guest !== '');

  if (name === '') errors.name = 'Enter your name so Maya knows who is joining.';
  if (email === '') errors.email = 'Enter an email for the invitation.';
  if (email !== '' && !emailPattern.test(email)) errors.email = 'Use the full address, like ada@example.com.';
  if (guests.length > 5) errors.guests = 'Invite up to 5 guests.';
  if (guests.some((guest) => !emailPattern.test(guest))) errors.guests = 'Separate guest emails with commas, like leo@acme.io, mia@acme.io.';

  return errors;
};

export default function EventScheduling() {
  const id = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const slotsRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  const [step, setStep] = useState<Step>('pick');
  const [length, setLength] = useState(30);
  const [date, setDate] = useState('');
  const [time, setTime] = useState<number | null>(null);
  const [timezone, setTimezone] = useState('Europe/Berlin');
  const [timeError, setTimeError] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [booked, setBooked] = useState({ name: '', email: '' });

  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    headingRef.current?.focus();
  }, [step]);

  const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: timezone });
  const slots = date === '' ? [] : getSlots(date, length);
  const end = time === null ? 0 : time + length * 60_000;
  const when = time === null ? '' : `${dayTitle.format(Date.parse(date))} · ${timeFormat.format(time)} – ${timeFormat.format(end)}`;
  const timezoneLabel = timezones.find((item) => item.value === timezone)?.label ?? '';
  const title = `${length}-minute design review with Maya Kovač`;

  const goTo = (next: Step) => {
    moved.current = true;
    setStep(next);
  };

  const changeDate = (next: string) => {
    setDate(next);
    setTime(null);
    setTimeError('');
  };

  const changeLength = (next: number) => {
    setLength(next);
    setTime(null);
  };

  const chooseTime = (slot: number) => {
    setTime(slot);
    setTimeError('');
  };

  const next = () => {
    if (time !== null) {
      setErrors({});
      goTo('details');
      return;
    }

    if (date === '') {
      setTimeError('Choose a day, then a time.');
      calendarRef.current?.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
      return;
    }

    setTimeError('Choose a time to continue.');
    slotsRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
  };

  const clearError = (name: string) => {
    if (!errors[name]) return;
    setErrors({ ...errors, [name]: undefined });
  };

  const describe = (name: string) => errors[name] ? `${id}-${name}-error` : undefined;

  const schedule = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validateDetails(data);
    const invalid = ['name', 'email', 'guests'].find((name) => nextErrors[name]);

    setErrors(nextErrors);

    if (invalid) {
      const element = form.elements.namedItem(invalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    setBooked({ name: String(data.get('name')).trim().split(' ')[0], email: String(data.get('email')).trim() });
    goTo('done');
  };

  const startOver = () => {
    setDate('');
    setTime(null);
    goTo('pick');
  };

  const host = (
    <Card style={{ alignItems: 'stretch', gap: 'var(--spacing-10)', flex: '1 1 260px', minWidth: 0 }} aria-labelledby={`${id}-event`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', minWidth: 0 }}>
        <Avatar size='lg' aria-hidden='true' style={{ flexShrink: 0 }}>
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
        <div style={{ display: 'grid', minWidth: 0 }}>
          <Text size={3} fontWeight={500}>Maya Kovač</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Design lead, Northwind</Text>
        </div>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading id={`${id}-event`} as='h2' size={5} fontWeight={700}>Design review</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Bring a link to your file. We’ll go through flows, edge cases and next steps.</Text>
      </div>
      <ul style={{ display: 'grid', gap: 'var(--spacing-5)', margin: 0, padding: 0, listStyle: 'none' }}>
        <li style={meta}>
          <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0 }}><Clock /></Icon>
          <Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{`${length} min`}</Text>
        </li>
        <li style={meta}>
          <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0 }}><Video /></Icon>
          <Text size={2}>Google Meet</Text>
        </li>
        {step !== 'pick' && (
          <>
            <li style={{ ...meta, color: 'var(--label-primary)' }}>
              <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0 }}><CalendarIcon /></Icon>
              <Text size={2} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>{when}</Text>
            </li>
            <li style={meta}>
              <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0 }}><Globe /></Icon>
              <Text size={2}>{timezoneLabel}</Text>
            </li>
          </>
        )}
      </ul>
    </Card>
  );

  if (step === 'done') {
    const links = calendarLinks(time ?? 0, end, title);

    return (
      <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 560, marginInline: 'auto' }}>
        <header style={{ display: 'grid', gap: 'var(--spacing-4)', justifyItems: 'start' }}>
          <Icon size='lg' aria-hidden='true' style={{ color: 'var(--color-green-accent-700)' }}><CircleCheck /></Icon>
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <Heading ref={headingRef} tabIndex={-1} as='h1' size={6} fontWeight={700} style={{ outline: 'none' }}>{`You’re scheduled, ${booked.name}`}</Heading>
            <Text size={3} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{`An invitation is on its way to ${booked.email}.`}</Text>
          </div>
        </header>
        {host}
        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <Text id={`${id}-add`} size={3} fontWeight={500}>Add to calendar</Text>
          <div role='group' aria-labelledby={`${id}-add`} style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
            <Button size='xs' asChild variant='secondary' appearance='ghost'>
              <a href={links.google} target='_blank' rel='noreferrer'>Google Calendar</a>
            </Button>
            <Button size='xs' asChild variant='secondary' appearance='ghost'>
              <a href={links.outlook} target='_blank' rel='noreferrer'>Outlook</a>
            </Button>
            <Button size='xs' asChild variant='secondary' appearance='ghost'>
              <a href={links.ics} download='design-review.ics'>Apple Calendar (.ics)</a>
            </Button>
          </div>
        </div>
        <Separator />
        <Button size='xs' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }} onClick={startOver}>Schedule another meeting</Button>
      </div>
    );
  }

  if (step === 'details') {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'var(--spacing-16)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
        {host}
        <form noValidate aria-labelledby={`${id}-details`} onSubmit={schedule} style={{ display: 'grid', gap: 'var(--spacing-12)', flex: '999 1 360px', minWidth: 0 }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <Heading ref={headingRef} tabIndex={-1} id={`${id}-details`} as='h1' size={6} fontWeight={700} style={{ outline: 'none' }}>Your details</Heading>
            <Text size={3} style={{ color: 'var(--label-secondary)' }}>We’ll send the invitation and a reminder an hour before.</Text>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 'var(--spacing-8)' }}>
              <div style={field}>
                <Label htmlFor={`${id}-name`}>Name</Label>
                <TextField error={errors.name !== undefined}>
                  <TextFieldInput
                    id={`${id}-name`}
                    name='name'
                    autoComplete='name'
                    aria-invalid={errors.name !== undefined}
                    aria-describedby={describe('name')}
                    onChange={() => clearError('name')}
                  />
                </TextField>
                {errors.name && <HelperText id={`${id}-name-error`} error>{errors.name}</HelperText>}
              </div>
              <div style={field}>
                <Label htmlFor={`${id}-email`}>Email</Label>
                <TextField error={errors.email !== undefined}>
                  <TextFieldInput
                    id={`${id}-email`}
                    name='email'
                    type='email'
                    autoComplete='email'
                    aria-invalid={errors.email !== undefined}
                    aria-describedby={describe('email')}
                    onChange={() => clearError('email')}
                  />
                </TextField>
                {errors.email && <HelperText id={`${id}-email-error`} error>{errors.email}</HelperText>}
              </div>
            </div>
            <div style={field}>
              <Label htmlFor={`${id}-guests`}>Guests (optional)</Label>
              <TextField error={errors.guests !== undefined}>
                <TextFieldInput
                  id={`${id}-guests`}
                  name='guests'
                  autoComplete='off'
                  placeholder='leo@acme.io, mia@acme.io'
                  aria-invalid={errors.guests !== undefined}
                  aria-describedby={errors.guests ? `${id}-guests-error` : `${id}-guests-hint`}
                  onChange={() => clearError('guests')}
                />
              </TextField>
              {errors.guests
                ? <HelperText id={`${id}-guests-error`} error>{errors.guests}</HelperText>
                : <HelperText id={`${id}-guests-hint`}>Up to 5 emails, separated by commas.</HelperText>}
            </div>
            <div style={field}>
              <Label htmlFor={`${id}-notes`}>Anything Maya should know? (optional)</Label>
              <TextArea id={`${id}-notes`} name='notes' rows={4} maxLength={500} fullWidth placeholder='Link to the file, the questions you want to cover…' />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
            <Button size='xs' type='button' variant='secondary' appearance='ghost' onClick={() => goTo('pick')}>Back</Button>
            <Button size='xs' type='submit'>Schedule meeting</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <header style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading ref={headingRef} tabIndex={-1} as='h1' size={7} fontWeight={700} style={{ outline: 'none' }}>Book a design review</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Pick a length, a day and a time that work for you.</Text>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'var(--spacing-16) var(--spacing-14)' }}>
        <div style={{ display: 'grid', flex: '1 1 220px', minWidth: 0 }}>
          {host}
        </div>

        <div ref={calendarRef} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-4)', flex: '1 1 280px', maxWidth: 'min(100%, 340px)', minWidth: 0 }}>
          <Calendar
            locale='en-US'
            min={FIRST_DAY}
            max={LAST_DAY}
            defaultMonth={FIRST_DAY}
            disabledDates={isUnavailable}
            value={date}
            onChangeValue={changeDate}
          >
            <CalendarHeader>
              <CalendarPrevButton aria-label='Previous month' />
              <CalendarViewButtonGroup>
                <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
              </CalendarViewButtonGroup>
              <CalendarNextButton aria-label='Next month' />
            </CalendarHeader>
            <CalendarContent>
              <CalendarDays aria-label='Day' aria-describedby={`${id}-days-hint`}>
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
          </Calendar>
          <HelperText id={`${id}-days-hint`}>Weekdays until December 23.</HelperText>
        </div>

        <section aria-labelledby={`${id}-times`} style={{ display: 'grid', gap: 'var(--spacing-8)', flex: '1 1 240px', minWidth: 0 }}>
          <div style={field}>
            <Label id={`${id}-length`}>Meeting length</Label>
            <SegmentedControl
              name={`${id}-length`}
              role='radiogroup'
              aria-labelledby={`${id}-length`}
              value={length}
              size='sm'
              style={{ width: '100%' }}
              onChange={(event) => changeLength(Number(event.currentTarget.value))}
            >
              {lengths.map((option) => (
                <SegmentedControlItem key={option} value={option} style={{ flex: 1, fontVariantNumeric: 'tabular-nums' }}>
                  <SegmentedControlItemInput />
                  {`${option} min`}
                </SegmentedControlItem>
              ))}
              <SegmentedControlIndicator />
            </SegmentedControl>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)', marginBlockStart: 'var(--spacing-4)' }}>
            <Heading id={`${id}-times`} as='h2' size={4} fontWeight={600}>{date === '' ? 'Available times' : dayTitle.format(Date.parse(date))}</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
              {date === '' ? 'Pick a day to see open times.' : `${slots.length} open ${slots.length === 1 ? 'time' : 'times'}`}
            </Text>
          </div>
          {slots.length > 0 && (
            <div
              ref={slotsRef}
              role='group'
              aria-labelledby={`${id}-times`}
              aria-describedby={timeError ? `${id}-time-error` : undefined}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 'var(--spacing-4)' }}
            >
              {slots.map((slot) => (
                <Button
                  key={slot}
                  type='button'
                  size='xs'
                  variant={time === slot ? 'primary' : 'secondary'}
                  appearance={time === slot ? 'fill' : 'ghost'}
                  aria-pressed={time === slot}
                  onClick={() => chooseTime(slot)}
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {timeFormat.format(slot)}
                </Button>
              ))}
            </div>
          )}
          {timeError && <HelperText id={`${id}-time-error`} error>{timeError}</HelperText>}
          <div style={field}>
            <Label htmlFor={`${id}-timezone`}>Time zone</Label>
            <Select value={timezone} onChangeValue={(next) => setTimezone(next ?? 'Europe/Berlin')}>
              <SelectHiddenSelect name='timezone' />
              <SelectCombobox id={`${id}-timezone`}>
                <SelectValue />
                <SelectIcon />
              </SelectCombobox>
              <SelectListbox>
                {timezones.map((item) => (
                  <SelectOption key={item.value} value={item.value}>{item.label}</SelectOption>
                ))}
              </SelectListbox>
            </Select>
          </div>
          <Button size='xs' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-4)' }} onClick={next}>Next</Button>
        </section>
      </div>
    </div>
  );
}
