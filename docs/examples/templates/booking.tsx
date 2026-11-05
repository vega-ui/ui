import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Badge,
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { Car, Flame, Star, Waves, Wifi, XIcon } from '@vega-ui/icons';

const NIGHTLY_RATE = 140;
const CLEANING_FEE = 45;
const SERVICE_RATE = 0.12;
const BOOKED = ['2026-11-20', '2026-11-21', '2026-11-22', '2026-11-23'];

const highlights = [
  { icon: <Waves />, title: 'Private lake access', text: 'A jetty and two kayaks, a two-minute walk from the door.' },
  { icon: <Flame />, title: 'Wood sauna and fireplace', text: 'Firewood is stacked and refilled for every stay.' },
  { icon: <Wifi />, title: 'Fast wifi', text: '300 Mbps fibre and a desk facing the water.' },
  { icon: <Car />, title: 'Free parking', text: 'Space for two cars, with an EV charger.' },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const day = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const row = { display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-8)' } as const;
const amount = { fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' } as const;
const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;

const countNights = ([checkIn, checkOut]: [string, string]) => {
  if (checkIn === '' || checkOut === '') return 0;

  return Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / 86_400_000);
};

const getStayError = ([checkIn, checkOut]: [string, string]) => {
  if (checkIn === '' || checkOut === '') return 'Choose check-in and check-out dates.';
  if (BOOKED.some((date) => date >= checkIn && date < checkOut)) return 'Nov 20–23 are already booked. Choose dates around them.';
  if (countNights([checkIn, checkOut]) < 2) return 'Stays are two nights or longer.';

  return '';
};

const formatStay = ([checkIn, checkOut]: [string, string]) => `${day.format(Date.parse(checkIn))} – ${day.format(Date.parse(checkOut))}`;

export default function Booking() {
  const id = useId();
  const [stay, setStay] = useState<[string, string]>(['2026-11-13', '2026-11-17']);
  const [guests, setGuests] = useState(2);
  const [stayError, setStayError] = useState('');
  const [open, setOpen] = useState(false);
  const [guestErrors, setGuestErrors] = useState<{ name?: string, email?: string }>({});
  const [requested, setRequested] = useState('');

  const nights = countNights(stay);
  const lodging = nights * NIGHTLY_RATE;
  const service = Math.round(lodging * SERVICE_RATE);
  const total = nights > 0 ? lodging + CLEANING_FEE + service : 0;

  const changeStay = (next: [string, string]) => {
    setStay(next);
    setStayError(next[0] !== '' && next[1] !== '' ? getStayError(next) : '');
    setRequested('');
  };

  const reserve = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = getStayError(stay);

    setStayError(error);

    if (error !== '') {
      const input = event.currentTarget.elements.namedItem('stay');
      if (input instanceof HTMLElement) input.focus();
      return;
    }

    setGuestErrors({});
    setOpen(true);
  };

  const sendRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name')).trim();
    const email = String(data.get('email')).trim();
    const errors: { name?: string, email?: string } = {};

    if (name === '') errors.name = 'Enter the name on your ID.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter an email so the host can reply.';

    setGuestErrors(errors);

    const invalid = Object.keys(errors)[0];

    if (invalid) {
      const element = form.elements.namedItem(invalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    setRequested(name.split(' ')[0]);
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'var(--spacing-16)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <article aria-labelledby={`${id}-title`} style={{ display: 'grid', gap: 'var(--spacing-12)', flex: '999 1 400px', minWidth: 0 }}>
        <header style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <Badge size='sm' variant='info'>Guest favourite</Badge>
            <Text size={2} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-2)', ...amount }}>
              <Icon size='xs' aria-hidden='true'><Star /></Icon>
              4.92 · 128 reviews
            </Text>
          </div>
          <Heading id={`${id}-title`} as='h1' size={7} fontWeight={700}>Lakeside cabin with a wood sauna</Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>Hallstatt, Austria · 2 bedrooms · 3 beds · 1 bath</Text>
        </header>

        <Text size={3} style={{ maxWidth: '60ch' }}>
          A quiet timber cabin on the western shore, hosted by Marta since 2019. Mornings start with mist over the water,
          evenings end in the sauna. The village and the ferry are a 15-minute walk along the lake.
        </Text>

        <Separator />

        <section aria-labelledby={`${id}-offers`} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
          <Heading id={`${id}-offers`} as='h2' size={4} fontWeight={600}>What this place offers</Heading>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 'var(--spacing-10) var(--spacing-12)', margin: 0, padding: 0, listStyle: 'none' }}>
            {highlights.map((item) => (
              <li key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-6)' }}>
                <Icon aria-hidden='true' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}>{item.icon}</Icon>
                <span style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
                  <Text size={3} fontWeight={500}>{item.title}</Text>
                  <Text size={2} style={{ color: 'var(--label-secondary)' }}>{item.text}</Text>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <Card asChild style={{ alignItems: 'stretch', gap: 'var(--spacing-10)', flex: '1 1 340px', minWidth: 0 }}>
        <form noValidate aria-labelledby={`${id}-price`} onSubmit={reserve}>
          <Text id={`${id}-price`} size={2} style={{ color: 'var(--label-secondary)' }}>
            <Text size={5} fontWeight={700} style={{ color: 'var(--label-primary)', ...amount }}>{currency.format(NIGHTLY_RATE)}</Text>
            {' per night'}
          </Text>

          {requested !== '' && (
            <Alert variant='success'>
              <AlertIcon />
              <AlertMain>
                <AlertTitle>Request sent</AlertTitle>
                <AlertContent>{`Thanks, ${requested}. Marta usually replies within an hour.`}</AlertContent>
              </AlertMain>
            </Alert>
          )}

          <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={field}>
              <Label htmlFor={`${id}-stay`}>Check-in – check-out</Label>
              <DateRangeField
                format='MM/dd/yyyy'
                separator='/'
                disabledDates={BOOKED}
                error={stayError !== ''}
                value={stay}
                onChangeValue={changeStay}
              >
                <DateRangeFieldInput
                  id={`${id}-stay`}
                  name='stay'
                  placeholder='mm/dd/yyyy – mm/dd/yyyy'
                  aria-invalid={stayError !== ''}
                  aria-describedby={`${id}-stay-hint`}
                />
                <Popover placement='bottom-end'>
                  <PopoverTrigger asChild>
                    <DateRangeFieldTriggerIconButton aria-label='Choose stay dates' />
                  </PopoverTrigger>
                  <PopoverContent>
                    <DateRangeFieldCalendar>
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
                    </DateRangeFieldCalendar>
                  </PopoverContent>
                </Popover>
              </DateRangeField>
              <HelperText id={`${id}-stay-hint`} error={stayError !== ''}>
                {stayError === '' ? 'Booked Nov 20–23. Two nights minimum.' : stayError}
              </HelperText>
            </div>

            <div style={field}>
              <Label htmlFor={`${id}-guests`}>Guests</Label>
              <NumberField min={1} max={4} value={guests} onChangeValue={(next) => setGuests(next ?? 1)}>
                <NumberFieldDecrementButton aria-label='Remove a guest' />
                <NumberFieldInput id={`${id}-guests`} name='guests' aria-describedby={`${id}-guests-hint`} />
                <NumberFieldIncrementButton aria-label='Add a guest' />
              </NumberField>
              <HelperText id={`${id}-guests-hint`}>Up to 4 guests. Infants stay free.</HelperText>
            </div>
          </div>

          {nights > 0 && (
            <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
              <div style={row}>
                <Text size={2}>{`${currency.format(NIGHTLY_RATE)} × ${nights} ${nights === 1 ? 'night' : 'nights'}`}</Text>
                <Text size={2} style={amount}>{currency.format(lodging)}</Text>
              </div>
              <div style={row}>
                <Text size={2}>Cleaning fee</Text>
                <Text size={2} style={amount}>{currency.format(CLEANING_FEE)}</Text>
              </div>
              <div style={row}>
                <Text size={2}>Service fee</Text>
                <Text size={2} style={amount}>{currency.format(service)}</Text>
              </div>
              <Separator style={{ marginBlock: 'var(--spacing-2)' }} />
              <div style={row}>
                <Text size={3} fontWeight={700}>Total</Text>
                <Text size={3} fontWeight={700} aria-live='polite' style={amount}>{currency.format(total)}</Text>
              </div>
            </div>
          )}

          <Button type='submit' size='sm' fullWidth>Reserve</Button>
          <Text size={2} style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>You won’t be charged until Marta accepts.</Text>
        </form>
      </Card>

      <Sheet open={open} onChangeOpen={setOpen}>
        <SheetContent aria-labelledby={`${id}-sheet-title`} aria-describedby={`${id}-sheet-summary`}>
          <SheetHandle aria-label='Resize sheet' />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-sheet-title`} as='h2' size={4} fontWeight={600}>Request to book</Heading>
            <SheetClose asChild>
              <IconButton size='xs' aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </SheetClose>
          </div>
          <Text id={`${id}-sheet-summary`} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-2)', color: 'var(--label-secondary)', ...amount, whiteSpace: 'normal' }}>
            {nights > 0 ? `${formatStay(stay)} · ${guests} ${guests === 1 ? 'guest' : 'guests'} · ${currency.format(total)} total` : ''}
          </Text>
          <form noValidate onSubmit={sendRequest} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-10)' }}>
            <div style={field}>
              <Label htmlFor={`${id}-guest-name`}>Full name</Label>
              <TextField error={guestErrors.name !== undefined}>
                <TextFieldInput
                  id={`${id}-guest-name`}
                  name='name'
                  autoComplete='name'
                  aria-invalid={guestErrors.name !== undefined}
                  aria-describedby={guestErrors.name ? `${id}-guest-name-error` : undefined}
                />
              </TextField>
              {guestErrors.name && <HelperText id={`${id}-guest-name-error`} error>{guestErrors.name}</HelperText>}
            </div>
            <div style={field}>
              <Label htmlFor={`${id}-guest-email`}>Email</Label>
              <TextField error={guestErrors.email !== undefined}>
                <TextFieldInput
                  id={`${id}-guest-email`}
                  name='email'
                  type='email'
                  autoComplete='email'
                  aria-invalid={guestErrors.email !== undefined}
                  aria-describedby={guestErrors.email ? `${id}-guest-email-error` : undefined}
                />
              </TextField>
              {guestErrors.email && <HelperText id={`${id}-guest-email-error`} error>{guestErrors.email}</HelperText>}
            </div>
            <div style={field}>
              <Label htmlFor={`${id}-message`}>Message to Marta (optional)</Label>
              <TextArea id={`${id}-message`} name='message' rows={3} maxLength={500} fullWidth placeholder='Arrival time, questions about the area…' />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
              <SheetClose asChild>
                <Button size='xs' type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </SheetClose>
              <Button size='xs' type='submit'>Send request</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
