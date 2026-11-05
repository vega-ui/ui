import { useId, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from 'react';
import {
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
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  Fieldset,
  FieldsetLegend,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Option,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
  TextField,
  TextFieldInput,
  VisuallyHidden,
} from '@vega-ui/react';
import { ArrowRight, MapPin, Plane, SlidersHorizontal, Users, XIcon } from '@vega-ui/icons';
import './travel-search.css';

type Sort = 'best' | 'cheapest' | 'fastest' | 'earliest';
type Time = 'any' | 'morning' | 'afternoon' | 'evening';

interface Filters {
  price: number[]
  stops: number[]
  airlines: string[]
  time: Time
}

interface Flight {
  id: string
  airline: string
  depart: string
  arrive: string
  duration: number
  stops: number
  via?: string
  price: number
}

const ORIGIN = { city: 'Berlin', code: 'BER' };
const PRICE_MIN = 50;
const PRICE_MAX = 300;

const destinations = [
  { city: 'Lisbon', country: 'Portugal', code: 'LIS' },
  { city: 'London', country: 'United Kingdom', code: 'LHR' },
  { city: 'Barcelona', country: 'Spain', code: 'BCN' },
  { city: 'Rome', country: 'Italy', code: 'FCO' },
  { city: 'Paris', country: 'France', code: 'CDG' },
  { city: 'Porto', country: 'Portugal', code: 'OPO' },
  { city: 'Madrid', country: 'Spain', code: 'MAD' },
  { city: 'Athens', country: 'Greece', code: 'ATH' },
  { city: 'Amsterdam', country: 'Netherlands', code: 'AMS' },
  { city: 'Reykjavík', country: 'Iceland', code: 'KEF' },
];

const flights: Flight[] = [
  { id: 'tp-531', airline: 'TAP Air Portugal', depart: '09:15', arrive: '11:55', duration: 220, stops: 0, price: 186 },
  { id: 'u2-4521', airline: 'easyJet', depart: '13:30', arrive: '16:10', duration: 220, stops: 0, price: 94 },
  { id: 'fr-8104', airline: 'Ryanair', depart: '21:20', arrive: '23:55', duration: 215, stops: 0, price: 68 },
  { id: 'lh-1870', airline: 'Lufthansa', depart: '06:40', arrive: '11:05', duration: 325, stops: 1, via: 'FRA', price: 212 },
  { id: 'ib-3651', airline: 'Iberia', depart: '10:05', arrive: '15:40', duration: 395, stops: 1, via: 'MAD', price: 154 },
  { id: 'lh-1932', airline: 'Lufthansa', depart: '17:45', arrive: '22:10', duration: 325, stops: 1, via: 'MUC', price: 238 },
  { id: 'tp-537', airline: 'TAP Air Portugal', depart: '19:00', arrive: '21:40', duration: 220, stops: 0, price: 204 },
  { id: 'ib-3117', airline: 'Iberia', depart: '07:30', arrive: '16:25', duration: 595, stops: 2, via: 'MAD, OPO', price: 122 },
];

type Destination = (typeof destinations)[number];

const airlines = [...new Set(flights.map((flight) => flight.airline))].sort();

const stopOptions = [
  { value: 0, label: 'Nonstop' },
  { value: 1, label: '1 stop' },
  { value: 2, label: '2+ stops' },
];

const times: { value: Time, label: string, from: number, to: number }[] = [
  { value: 'any', label: 'Any', from: 0, to: 24 },
  { value: 'morning', label: 'Morning', from: 5, to: 12 },
  { value: 'afternoon', label: 'Afternoon', from: 12, to: 18 },
  { value: 'evening', label: 'Evening', from: 18, to: 24 },
];

const sorts: { value: Sort, label: string }[] = [
  { value: 'best', label: 'Best' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'fastest', label: 'Fastest' },
  { value: 'earliest', label: 'Earliest departure' },
];

const defaultFilters: Filters = { price: [PRICE_MIN, PRICE_MAX], stops: [0, 1, 2], airlines, time: 'any' };

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start', minWidth: 0 } as const;
const secondary = { color: 'var(--label-secondary)' } as const;
const tabular = { fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' } as const;
const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;

const formatDuration = (minutes: number) => `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, '0')} min`;

const formatStops = (flight: Flight) => {
  if (flight.stops === 0) return 'Nonstop';
  if (flight.stops === 1) return `1 stop · ${flight.via}`;

  return `${flight.stops} stops · ${flight.via}`;
};

const formatRange = ([start, end]: string[]) => {
  if (!start || !end) return 'Any dates';

  return `${shortDate.format(new Date(start))} – ${shortDate.format(new Date(end))}`;
};

const formatTravellers = (adults: number, children: number) => {
  const parts = [`${adults} ${adults === 1 ? 'adult' : 'adults'}`];

  if (children > 0) parts.push(`${children} ${children === 1 ? 'child' : 'children'}`);

  return parts.join(', ');
};

const getHour = (time: string) => Number(time.slice(0, 2));

const matchesFilters = (flight: Flight, filters: Filters) => {
  const time = times.find((item) => item.value === filters.time) ?? times[0];
  const hour = getHour(flight.depart);

  if (flight.price < filters.price[0] || flight.price > filters.price[1]) return false;
  if (!filters.stops.includes(Math.min(flight.stops, 2))) return false;
  if (!filters.airlines.includes(flight.airline)) return false;

  return hour >= time.from && hour < time.to;
};

const getScore = (flight: Flight) => flight.price + flight.duration * 0.4;

const compare: Record<Sort, (a: Flight, b: Flight) => number> = {
  best: (a, b) => getScore(a) - getScore(b),
  cheapest: (a, b) => a.price - b.price,
  fastest: (a, b) => a.duration - b.duration,
  earliest: (a, b) => a.depart.localeCompare(b.depart),
};

const countActive = (filters: Filters) => {
  let count = 0;

  if (filters.price[0] !== PRICE_MIN || filters.price[1] !== PRICE_MAX) count += 1;
  if (filters.stops.length !== defaultFilters.stops.length) count += 1;
  if (filters.airlines.length !== airlines.length) count += 1;
  if (filters.time !== 'any') count += 1;

  return count;
};

const focusField = (form: HTMLFormElement, name: string) => {
  const element = form.elements.namedItem(name);
  if (element instanceof HTMLElement) element.focus();
};

const toggle = <T,>(list: T[], value: T, checked: boolean) => (checked ? [...list, value] : list.filter((item) => item !== value));

interface FiltersProps {
  prefix: string
  filters: Filters
  onChange(filters: Filters): void
}

const FlightFilters = ({ prefix, filters, onChange }: FiltersProps) => (
  <div style={{ display: 'grid', gap: 'var(--spacing-12)' }}>
    <div style={{ ...field, gap: 'var(--spacing-5)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-2) var(--spacing-6)' }}>
        <Label id={`${prefix}-price`}>Price</Label>
        <Text size={2} aria-hidden='true' style={{ ...secondary, ...tabular }}>{`${currency.format(filters.price[0])} – ${currency.format(filters.price[1])}`}</Text>
      </div>
      <Slider
        min={PRICE_MIN}
        max={PRICE_MAX}
        step={10}
        minStepsBetweenThumbs={1}
        value={filters.price}
        onChangeValue={(price) => onChange({ ...filters, price })}
        role='group'
        aria-labelledby={`${prefix}-price`}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0}>
          <SliderThumbInput aria-label='Minimum price' aria-valuetext={currency.format(filters.price[0])} />
          <SliderThumbIndicator />
        </SliderThumb>
        <SliderThumb index={1}>
          <SliderThumbInput aria-label='Maximum price' aria-valuetext={currency.format(filters.price[1])} />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
    </div>

    <Fieldset className='travelFieldset' style={{ gap: 'var(--spacing-5)' }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-3)' }}><Text size={3} fontWeight={500}>Stops</Text></FieldsetLegend>
      {stopOptions.map((option) => (
        <Checkbox key={option.value} className='travelCheck'>
          <CheckboxInput
            name={`${prefix}-stops`}
            value={option.value}
            checked={filters.stops.includes(option.value)}
            onChange={(event) => onChange({ ...filters, stops: toggle(filters.stops, option.value, event.currentTarget.checked) })}
          />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
          </CheckboxIndicator>
          {option.label}
        </Checkbox>
      ))}
    </Fieldset>

    <Fieldset className='travelFieldset' style={{ gap: 'var(--spacing-5)' }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-3)' }}><Text size={3} fontWeight={500}>Airlines</Text></FieldsetLegend>
      {airlines.map((airline) => {
        const count = flights.filter((flight) => flight.airline === airline).length;

        return (
          <Checkbox key={airline} className='travelCheck'>
            <CheckboxInput
              name={`${prefix}-airlines`}
              value={airline}
              checked={filters.airlines.includes(airline)}
              onChange={(event) => onChange({ ...filters, airlines: toggle(filters.airlines, airline, event.currentTarget.checked) })}
            />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
            </CheckboxIndicator>
            <span style={{ flex: 1, minWidth: 0 }}>{airline}</span>
            <Text size={2} aria-hidden='true' style={{ ...secondary, ...tabular }}>{count}</Text>
            <VisuallyHidden>{`, ${count} ${count === 1 ? 'flight' : 'flights'}`}</VisuallyHidden>
          </Checkbox>
        );
      })}
    </Fieldset>

    <div style={field}>
      <Label id={`${prefix}-time`}>Departure time</Label>
      <SegmentedControl
        size='xs'
        name={`${prefix}-time`}
        role='radiogroup'
        aria-labelledby={`${prefix}-time`}
        value={filters.time}
        className='travelTime'
        onChange={(event) => onChange({ ...filters, time: event.target.value as Time })}
      >
        {times.map((time) => (
          <SegmentedControlItem key={time.value} value={time.value}>
            <SegmentedControlItemInput aria-describedby={`${prefix}-time-${time.value}`} />
            {time.label}
          </SegmentedControlItem>
        ))}
        <SegmentedControlIndicator />
      </SegmentedControl>
      <div className='travelTimeHints'>
        {times.map((time) => (
          <HelperText key={time.value} id={`${prefix}-time-${time.value}`}>
            {time.value === 'any' ? 'All day' : `${String(time.from).padStart(2, '0')}–${time.to}`}
          </HelperText>
        ))}
      </div>
    </div>
  </div>
);

export default function TravelSearch() {
  const id = useId();
  const listId = `${id}-destinations`;
  const [query, setQuery] = useState('Lisbon');
  const [destination, setDestination] = useState<Destination | null>(destinations[0]);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [dates, setDates] = useState<[string, string]>(['2026-12-12', '2026-12-19']);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [travellersOpen, setTravellersOpen] = useState(false);
  const [errors, setErrors] = useState<{ destination?: string, dates?: string }>({});
  const [search, setSearch] = useState({ destination: destinations[0], dates, travellers: 2, label: formatTravellers(2, 0) });
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<Sort>('best');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const term = query.trim().toLowerCase();
  const matches = destinations
    .filter((item) => `${item.city} ${item.country} ${item.code}`.toLowerCase().includes(term))
    .slice(0, 6);
  const expanded = suggestOpen && matches.length > 0;

  const visible = flights.filter((flight) => matchesFilters(flight, filters)).sort(compare[sort]);
  const cheapest = visible.reduce<Flight | undefined>((best, flight) => (!best || flight.price < best.price ? flight : best), undefined);
  const recommended = visible.reduce<Flight | undefined>((best, flight) => (!best || getScore(flight) < getScore(best) ? flight : best), undefined);
  const activeFilters = countActive(filters);

  const changeQuery = (value: string) => {
    setQuery(value);
    setActive(0);
    setSuggestOpen(value.trim() !== '');
    setErrors({ ...errors, destination: undefined });

    const exact = destinations.find((item) => item.city.toLowerCase() === value.trim().toLowerCase());
    setDestination(exact ?? null);
  };

  const choose = (item: Destination) => {
    setQuery(item.city);
    setDestination(item);
    setSuggestOpen(false);
    setErrors({ ...errors, destination: undefined });
  };

  const onQueryKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && !expanded) {
      event.preventDefault();
      setSuggestOpen(true);
      return;
    }

    if (!expanded) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((active + 1) % matches.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((active - 1 + matches.length) % matches.length);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      choose(matches[active]);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setSuggestOpen(false);
    }
  };

  const changeDates = (next: [string, string]) => {
    setDates(next);
    setErrors({ ...errors, dates: undefined });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const next: typeof errors = {};

    if (!destination) next.destination = 'Choose a destination from the list.';
    if (!dates[0] || !dates[1]) next.dates = 'Choose departure and return dates.';

    setErrors(next);

    if (!destination) {
      focusField(form, 'to');
      return;
    }

    if (next.dates) {
      focusField(form, 'dates');
      return;
    }

    setSearch({ destination, dates, travellers: adults + children, label: formatTravellers(adults, children) });
    setFilters(defaultFilters);
  };

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <div className='travel' style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <Card asChild style={{ alignItems: 'stretch', gap: 'var(--spacing-10)', minWidth: 0 }}>
        <form noValidate role='search' aria-labelledby={`${id}-title`} onSubmit={submit}>
          <Heading id={`${id}-title`} as='h1' size={6} fontWeight={700}>Find flights</Heading>
          <div className='travelSearchRow'>
            <div style={field}>
              <Label htmlFor={`${id}-from`}>From</Label>
              <TextField size='xs'>
                <TextFieldInput id={`${id}-from`} name='from' value={`${ORIGIN.city} (${ORIGIN.code})`} readOnly />
              </TextField>
            </div>
            <div style={field}>
              <Label htmlFor={`${id}-to`}>To</Label>
              <Popover placement='bottom-start' open={expanded} onChangeOpen={setSuggestOpen}>
                <PopoverTrigger asChild>
                  <TextField size='xs' error={errors.destination !== undefined}>
                    <TextFieldInput
                      id={`${id}-to`}
                      name='to'
                      role='combobox'
                      autoComplete='off'
                      spellCheck={false}
                      placeholder='City or airport'
                      value={query}
                      aria-autocomplete='list'
                      aria-expanded={expanded}
                      aria-controls={expanded ? listId : undefined}
                      aria-activedescendant={expanded ? `${listId}-${matches[active].code}` : undefined}
                      aria-invalid={errors.destination !== undefined}
                      aria-describedby={errors.destination ? `${id}-to-error` : undefined}
                      onChange={(event) => changeQuery(event.currentTarget.value)}
                      onKeyDown={onQueryKeyDown}
                    />
                  </TextField>
                </PopoverTrigger>
                <PopoverContent className='travelSuggestions'>
                  <div role='listbox' id={listId} aria-label='Destinations'>
                    {matches.map((item, index) => (
                      <Option
                        key={item.code}
                        id={`${listId}-${item.code}`}
                        size='sm'
                        active={index === active}
                        selected={destination?.code === item.code}
                        onMouseDown={(event) => event.preventDefault()}
                        onPointerMove={() => setActive(index)}
                        onClick={() => choose(item)}
                        style={{ gap: 'var(--spacing-6)', '--option-height': 'var(--spacing-22)' } as CSSProperties}
                      >
                        <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}><MapPin /></Icon>
                        <span style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                          <Text size={3}>{item.city}</Text>
                          <Text size={1} style={secondary}>{item.country}</Text>
                        </span>
                        <Text size={2} style={{ ...secondary, ...tabular }}>{item.code}</Text>
                      </Option>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              {errors.destination && <HelperText id={`${id}-to-error`} error>{errors.destination}</HelperText>}
            </div>
            <div style={field}>
              <Label htmlFor={`${id}-dates`}>Dates</Label>
              <DateRangeField
                size='xs'
                format='MM/dd/yyyy'
                separator='/'
                min='2026-11-04'
                error={errors.dates !== undefined}
                value={dates}
                onChangeValue={changeDates}
              >
                <DateRangeFieldInput
                  id={`${id}-dates`}
                  name='dates'
                  placeholder='mm/dd/yyyy – mm/dd/yyyy'
                  aria-invalid={errors.dates !== undefined}
                  aria-describedby={errors.dates ? `${id}-dates-error` : undefined}
                  style={tabular}
                />
                <Popover placement='bottom-end'>
                  <PopoverTrigger asChild>
                    <DateRangeFieldTriggerIconButton aria-label='Choose travel dates' />
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
              {errors.dates && <HelperText id={`${id}-dates-error`} error>{errors.dates}</HelperText>}
            </div>
            <div style={field}>
              <Label id={`${id}-travellers-label`}>Travellers</Label>
              <Popover role='dialog' placement='bottom-start' open={travellersOpen} onChangeOpen={setTravellersOpen}>
                <PopoverTrigger className='travelPicker' aria-labelledby={`${id}-travellers-label ${id}-travellers-value`}>
                  <Icon size='xs' aria-hidden='true' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}><Users /></Icon>
                  <span id={`${id}-travellers-value`} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{formatTravellers(adults, children)}</span>
                </PopoverTrigger>
                <PopoverContent aria-labelledby={`${id}-travellers-title`}>
                  <div style={{ display: 'grid', gap: 'var(--spacing-10)', width: 260 }}>
                    <Heading id={`${id}-travellers-title`} as='h2' size={3} fontWeight={600}>Travellers</Heading>
                    <div className='travelCounter'>
                      <span style={{ display: 'grid' }}>
                        <Label htmlFor={`${id}-adults`}>Adults</Label>
                        <Text id={`${id}-adults-hint`} size={1} style={secondary}>12 years and older</Text>
                      </span>
                      <NumberField size='xs' min={1} max={9} value={adults} onChangeValue={(next) => setAdults(next ?? 1)} style={{ width: 112 }}>
                        <NumberFieldDecrementButton aria-label='Remove an adult' />
                        <NumberFieldInput id={`${id}-adults`} aria-describedby={`${id}-adults-hint`} />
                        <NumberFieldIncrementButton aria-label='Add an adult' />
                      </NumberField>
                    </div>
                    <div className='travelCounter'>
                      <span style={{ display: 'grid' }}>
                        <Label htmlFor={`${id}-children`}>Children</Label>
                        <Text id={`${id}-children-hint`} size={1} style={secondary}>2 to 11 years</Text>
                      </span>
                      <NumberField size='xs' min={0} max={8} value={children} onChangeValue={(next) => setChildren(next ?? 0)} style={{ width: 112 }}>
                        <NumberFieldDecrementButton aria-label='Remove a child' />
                        <NumberFieldInput id={`${id}-children`} aria-describedby={`${id}-children-hint`} />
                        <NumberFieldIncrementButton aria-label='Add a child' />
                      </NumberField>
                    </div>
                    <Button size='xs' onClick={() => setTravellersOpen(false)} style={{ justifySelf: 'end' }}>Done</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Button size='xs' type='submit' className='travelSubmit'>Search</Button>
          </div>
        </form>
      </Card>

      <div className='travelResults'>
        <aside aria-labelledby={`${id}-filters`} className='travelFilters'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-filters`} as='h2' size={4} fontWeight={600}>Filters</Heading>
            <Button size='xs' variant='secondary' appearance='ghost' disabled={activeFilters === 0} onClick={resetFilters}>Reset</Button>
          </div>
          <FlightFilters prefix={`${id}-aside`} filters={filters} onChange={setFilters} />
        </aside>

        <section aria-labelledby={`${id}-results`} style={{ display: 'grid', alignContent: 'start', gap: 'var(--spacing-8)', minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--spacing-6) var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
              <Heading id={`${id}-results`} as='h2' size={5} fontWeight={600} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                {ORIGIN.city}
                <Icon size='sm' aria-hidden='true' className='travelArrow'><ArrowRight /></Icon>
                <VisuallyHidden>to</VisuallyHidden>
                {search.destination.city}
              </Heading>
              <Text size={2} role='status' style={{ ...secondary, fontVariantNumeric: 'tabular-nums' }}>
                {`${formatRange(search.dates)} · ${search.label} · ${visible.length} of ${flights.length} flights`}
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <Button size='xs' variant='secondary' appearance='ghost' className='travelFiltersTrigger' onClick={() => setFiltersOpen(true)} style={{ gap: 'var(--spacing-3)' }}>
                <Icon size='xs' aria-hidden='true'><SlidersHorizontal /></Icon>
                {activeFilters > 0 ? `Filters · ${activeFilters}` : 'Filters'}
              </Button>
              <Select size='xs' value={sort} onChangeValue={(next) => setSort((next ?? 'best') as Sort)}>
                <SelectCombobox aria-label='Sort flights' style={{ minWidth: 150 }}>
                  <SelectValue />
                  <SelectIcon />
                </SelectCombobox>
                <SelectListbox>
                  {sorts.map((item) => (
                    <SelectOption key={item.value} value={item.value}>{item.label}</SelectOption>
                  ))}
                </SelectListbox>
              </Select>
            </div>
          </div>

          {visible.length === 0 && (
            <div style={{ display: 'grid', justifyItems: 'start', gap: 'var(--spacing-6)', padding: 'var(--spacing-12)', borderRadius: 'var(--radius-4)', background: 'var(--fills-quaternary)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
                <Text size={3} fontWeight={500}>No flights match your filters</Text>
                <Text size={2} style={secondary}>Widen the price range, allow more stops or include more airlines.</Text>
              </div>
              <Button size='xs' variant='secondary' appearance='ghost' onClick={resetFilters}>Reset filters</Button>
            </div>
          )}

          {visible.length > 0 && (
            <ul aria-label='Flights' style={{ display: 'grid', gap: 'var(--spacing-6)', margin: 0, padding: 0, listStyle: 'none' }}>
              {visible.map((flight) => (
                <li key={flight.id}>
                  <Card size='sm' className='travelFlight'>
                    <div className='travelFlightMain'>
                      <span aria-hidden='true' className='travelAirline'><Icon size='sm'><Plane /></Icon></span>
                      <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-2) var(--spacing-4)' }}>
                          <Text size={2} style={secondary}>{flight.airline}</Text>
                          {flight === recommended && <Badge size='xs' variant='info'>Best</Badge>}
                          {flight === cheapest && <Badge size='xs' variant='success'>Cheapest</Badge>}
                        </div>
                        <Text size={5} fontWeight={600} style={tabular}>{`${flight.depart} – ${flight.arrive}`}</Text>
                        <Text size={2} style={{ ...secondary, fontVariantNumeric: 'tabular-nums' }}>
                          {`${ORIGIN.code} – ${search.destination.code} · ${formatDuration(flight.duration)} · ${formatStops(flight)}`}
                        </Text>
                      </div>
                    </div>
                    <div className='travelFlightPrice'>
                      <span style={{ display: 'grid', justifyItems: 'end' }}>
                        <Text size={5} fontWeight={700} style={tabular}>{currency.format(flight.price)}</Text>
                        <Text size={1} style={{ ...secondary, ...tabular }}>
                          {search.travellers > 1 ? `${currency.format(flight.price * search.travellers)} total` : 'per traveller'}
                        </Text>
                      </span>
                      <Button size='xs' variant='secondary' appearance='ghost' aria-label={`Select ${flight.airline} ${flight.depart} flight`}>Select</Button>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <Sheet open={filtersOpen} onChangeOpen={setFiltersOpen}>
        <SheetContent aria-labelledby={`${id}-sheet-title`}>
          <SheetHandle aria-label='Resize sheet' />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)', marginBlockEnd: 'var(--spacing-10)' }}>
            <Heading id={`${id}-sheet-title`} as='h2' size={4} fontWeight={600}>Filters</Heading>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <Button size='xs' variant='secondary' appearance='ghost' disabled={activeFilters === 0} onClick={resetFilters}>Reset</Button>
              <SheetClose asChild>
                <IconButton size='xs' aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                  <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                </IconButton>
              </SheetClose>
            </div>
          </div>
          <FlightFilters prefix={`${id}-sheet`} filters={filters} onChange={setFilters} />
          <Separator style={{ marginBlock: 'var(--spacing-10)' }} />
          <SheetClose asChild>
            <Button size='sm' fullWidth style={tabular}>{visible.length === 0 ? 'No flights to show' : `Show ${visible.length} ${visible.length === 1 ? 'flight' : 'flights'}`}</Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}
