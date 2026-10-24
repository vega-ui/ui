import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC, Fragment, ReactNode, useState } from 'react';
import { Calendar } from './Calendar';
import {
  CalendarDay,
  CalendarContent,
  CalendarDays,
  CalendarHeader,
  CalendarMonthLabel,
  CalendarMonth,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekdays, CalendarWeekday,
  CalendarWeeks,
  CalendarYearLabel,
  CalendarYear,
  CalendarYears,
} from './components';
import { useCalendarDayContext } from './contexts';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Code } from '../Code';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { CalendarSystem, formatCalendarDate, getDefaultLocale, gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate, getNextDate, parseISODate } from '@vega-ui/utils';

const calendarSystems = [
  { name: 'Gregorian', locale: 'en-US', calendar: gregorianCalendar },
  { name: 'Persian', locale: 'fa-IR', calendar: createCalendarSystem('persian') },
  { name: 'Hebrew', locale: 'he-IL', calendar: createCalendarSystem('hebrew') },
  { name: 'Buddhist', locale: 'th-TH', calendar: createCalendarSystem('buddhist') },
  { name: 'Islamic', locale: 'ar-SA', calendar: createCalendarSystem('islamic-umalqura') },
];

interface CalendarPartsProps {
  day?: ReactNode;
  weekdays?: 'short' | 'narrow';
  includeOverflowDays?: boolean;
}

const CalendarParts: FC<CalendarPartsProps> = ({ day = <CalendarDay />, weekdays = 'short', includeOverflowDays }) => (
  <>
    <CalendarHeader>
      <CalendarPrevButton aria-label='Previous' />
      <CalendarViewButtonGroup>
        <CalendarViewButton view='month'>
          <CalendarMonthLabel />
        </CalendarViewButton>
        <CalendarViewButton view='year'>
          <CalendarYearLabel />
        </CalendarViewButton>
      </CalendarViewButtonGroup>
      <CalendarNextButton aria-label='Next' />
    </CalendarHeader>
    <CalendarContent>
      <CalendarDays>
        <CalendarWeekdays format={weekdays}>
          <CalendarWeekday />
        </CalendarWeekdays>
        <CalendarWeeks includeOverflowDays={includeOverflowDays}>
          {day}
        </CalendarWeeks>
      </CalendarDays>
      <CalendarMonths>
        <CalendarMonth />
      </CalendarMonths>
      <CalendarYears>
        <CalendarYear />
      </CalendarYears>
    </CalendarContent>
  </>
);

const today = formatISODate(getCurrentDate());
const shift = (days: number) => formatISODate(getNextDate(getCurrentDate(), days));
const isWeekend = (date: string) => [0, 6].includes(parseISODate(date)?.getDay() ?? -1);

const Stack: FC<{ children: ReactNode; gap?: number }> = ({ children, gap = 12 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>
);

const Row: FC<{ children: ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>{children}</div>
);

const Caption: FC<{ children: ReactNode }> = ({ children }) => (
  <Text size={2} style={{ color: 'var(--color-gray-accent-600)' }}>{children}</Text>
);

const meta: Meta<typeof Calendar> = {
  title: 'Data/Calendar/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  args: {
    children: <CalendarParts />,
  },
  argTypes: {
    compact: {
      control: 'boolean',
    },
    locale: {
      control: 'select',
      options: ['en-US', 'de-DE', 'ja-JP', 'ar-EG', 'he-IL'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    selection: {
      control: 'radio',
      options: ['single', 'multiple', 'range'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The current month in the Gregorian calendar, with the header to switch
 * between the days, the months and the years. Keyboard focus starts on today.
 */
export const Default: Story = {
  args: {},
};

/**
 * `defaultMonth` sets the month shown first, given as any of its days.
 */
export const DefaultMonth: Story = {
  args: {
    defaultMonth: '2020-01-01',
  },
};

/**
 * `selection` switches between one day, any set of days, and a range between
 * two days. `defaultValue` is shaped by the mode: a string, an array, or a
 * `[start, end]` tuple.
 */
export const SelectionModes: Story = {
  render: () => (
    <Row>
      <Stack>
        <Caption>single</Caption>
        <Calendar compact selection='single' defaultValue={today}>
          <CalendarParts />
        </Calendar>
      </Stack>
      <Stack>
        <Caption>multiple</Caption>
        <Calendar compact selection='multiple' defaultValue={[shift(-3), today, shift(3)]}>
          <CalendarParts />
        </Calendar>
      </Stack>
      <Stack>
        <Caption>range</Caption>
        <Calendar compact selection='range' defaultValue={[shift(-2), shift(4)]}>
          <CalendarParts />
        </Calendar>
      </Stack>
    </Row>
  ),
};

/**
 * `min` and `max` limit the selectable days; days, months and years outside
 * the bounds cannot be selected, and the previous and next buttons hide at
 * the bounds. Here only the last week and the next month are available.
 */
export const Bounds: Story = {
  args: {
    min: shift(-7),
    max: shift(30),
  },
};

/**
 * `disabledDates` takes a day, an array of days or a predicate. Here weekends
 * cannot be picked.
 */
export const DisabledDays: Story = {
  args: {
    disabledDates: isWeekend,
  },
};

/**
 * `disabled` turns off the whole calendar: no day can be selected and
 * navigation is off. The selected day stays visible.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: today,
  },
};

/**
 * Both `variant` presets, shown with a selected day.
 */
export const Variants: Story = {
  args: {
    compact: true,
  },
  render: (props) => (
    <Row>
      {(['primary', 'secondary'] as const).map((variant) => (
        <Stack key={variant}>
          <Caption>{variant}</Caption>
          <Calendar {...props} variant={variant} defaultValue={today} />
        </Stack>
      ))}
    </Row>
  ),
};

/**
 * Every `size`, from the dense `xs` (the default) to `xl`.
 */
export const Sizes: Story = {
  args: {
    compact: true,
  },
  render: (props) => (
    <Row>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Stack key={size}>
          <Caption>{size}</Caption>
          <Calendar {...props} size={size} defaultValue={today} />
        </Stack>
      ))}
    </Row>
  ),
};

/**
 * `locale` on the root applies to every part: month and year labels, day
 * numbers and the first day of the week. No provider is needed.
 */
export const Locales: Story = {
  args: {
    compact: true,
  },
  render: (props) => (
    <Row>
      {['en-US', 'de-DE', 'ja-JP', 'ar-EG'].map((locale) => (
        <Stack key={locale}>
          <Caption>{locale}</Caption>
          <Calendar {...props} locale={locale} defaultValue={today} />
        </Stack>
      ))}
    </Row>
  ),
};

/**
 * The calendar follows the text direction it is rendered in, like native
 * elements: here `dir="rtl"` on a wrapper. Weeks run from right to left, the
 * previous and next buttons swap sides and their chevrons are mirrored,
 * ArrowRight moves to the previous day and ArrowLeft to the next one, and the
 * next month slides in from the left. Direction is never taken from `locale`.
 */
export const RightToLeft: Story = {
  args: {
    compact: true,
  },
  render: (props) => (
    <Row>
      {['ar-EG', 'he-IL'].map((locale) => (
        <Stack key={locale}>
          <Caption>{locale}</Caption>
          <div dir='rtl'>
            <Calendar {...props} locale={locale} defaultValue={today} />
          </div>
        </Stack>
      ))}
    </Row>
  ),
};

/**
 * `value` and `month` are ISO strings, like the value of a native
 * `<input type="date">`. Navigating months only reports `onChangeMonth`;
 * the value changes when a day is picked.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(today);
    const [month, setMonth] = useState(today);

    const showToday = () => {
      setValue(today);
      setMonth(today);
    };

    return (
      <Row>
        <Calendar compact selection='single' value={value} onChangeValue={setValue} month={month} onChangeMonth={setMonth}>
          <CalendarParts />
        </Calendar>
        <Card style={{ minWidth: 220 }}>
          <Stack>
            <Heading as='h3' size={4}>State</Heading>
            <Caption>value</Caption>
            <Code>{JSON.stringify(value)}</Code>
            <Caption>month</Caption>
            <Code>{JSON.stringify(month)}</Code>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size='sm' onClick={showToday}>Today</Button>
              <Button size='sm' variant='secondary' onClick={() => setValue('')}>Clear</Button>
            </div>
          </Stack>
        </Card>
      </Row>
    );
  },
};

/**
 * A booking calendar built from the props above: past days are unavailable
 * through `min`, weekends through a `disabledDates` predicate, and the
 * controlled range is summarized aside in the default locale.
 */
export const Booking: Story = {
  render: () => {
    const [[start, end], setRange] = useState<[string, string]>(['', '']);

    const startDate = parseISODate(start);
    const endDate = parseISODate(end);
    const nights = startDate && endDate ? Math.round((endDate.getTime() - startDate.getTime()) / 86_400_000) : 0;

    const format = (date: string) => {
      if (!date) return '—';

      return formatCalendarDate(gregorianCalendar, date, getDefaultLocale(), { dateStyle: 'medium' });
    };

    return (
      <Row>
        <Calendar compact selection='range' min={today} max={shift(90)} disabledDates={isWeekend} value={[start, end]} onChangeValue={setRange}>
          <CalendarParts />
        </Calendar>
        <Card style={{ minWidth: 220 }}>
          <Stack>
            <Heading as='h3' size={4}>Your stay</Heading>
            <Caption>Check-in</Caption>
            <Text>{format(start)}</Text>
            <Caption>Check-out</Caption>
            <Text>{format(end)}</Text>
            <Badge variant={nights ? 'success' : 'info'}>{nights ? `${nights} nights` : 'Pick two days'}</Badge>
          </Stack>
        </Card>
      </Row>
    );
  },
};

interface CalendarSystemCardProps {
  name: string;
  locale: string;
  calendar: CalendarSystem;
  value: string;
  onChangeValue(value: string): void;
}

const CalendarSystemCard: FC<CalendarSystemCardProps> = ({ name, locale, calendar, value, onChangeValue }) => (
  <Card>
    <Stack gap={8}>
      <Heading as='h3' size={4}>{name}</Heading>
      <Caption>{locale}</Caption>
      <Calendar compact locale={locale} calendar={calendar} value={value} onChangeValue={onChangeValue}>
        <CalendarParts weekdays='narrow' />
      </Calendar>
    </Stack>
  </Card>
);

/**
 * One ISO value shown in several calendar systems. Each calendar takes its
 * own `calendar` and `locale`; picking a day in any of them updates all of
 * them.
 */
export const CalendarSystems: Story = {
  render: () => {
    const [value, setValue] = useState(today);

    return (
      <Stack gap={24}>
        <Text>
          Selected: <Code>{value}</Code>
        </Text>
        <Row>
          {calendarSystems.map(({ name, locale, calendar }) => (
            <CalendarSystemCard key={name} name={name} locale={locale} calendar={calendar} value={value} onChangeValue={setValue} />
          ))}
        </Row>
      </Stack>
    );
  },
};

const keys = [
  ['←  →', 'Previous / next day'],
  ['↑  ↓', 'Same day of the previous / next week'],
  ['Home / End', 'First / last day of the week'],
  ['PageUp / PageDown', 'Same day of the previous / next month'],
  ['Shift + PageUp / PageDown', 'Same day of the previous / next year'],
  ['Enter / Space', 'Select the focused day'],
];

/**
 * Keyboard support follows the WAI-ARIA date picker pattern. Navigation only
 * moves focus; the value changes when a day is selected.
 */
export const Keyboard: Story = {
  args: {
    compact: true,
  },
  render: (props) => (
    <Row>
      <Calendar {...props} defaultValue={today} />
      <Card>
        <Stack gap={8}>
          <Heading as='h3' size={4}>Keyboard</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '8px 16px', alignItems: 'center' }}>
            {keys.map(([key, action]) => (
              <Fragment key={key}>
                <Code>{key}</Code>
                <Text size={2}>{action}</Text>
              </Fragment>
            ))}
          </div>
        </Stack>
      </Card>
    </Row>
  ),
};

const getPrice = (day: number) => {
  if (day % 6 === 0) return { variant: 'success', price: '30$' } as const;
  if (day % 5 === 0) return { variant: 'info', price: '39$' } as const;
  if (day % 2 === 0) return { variant: 'error', price: '120$' } as const;
  return { variant: 'warning', price: '50$' } as const;
};

const PricedDay: FC = () => {
  const { label, fields, inMonth } = useCalendarDayContext();

  if (!inMonth || !fields) return <CalendarDay />;

  const { variant, price } = getPrice(fields.day);

  return (
    <CalendarDay style={{ display: 'flex', flexDirection: 'column', gap: 4, minHeight: 'min-content', paddingBlock: 12 }}>
      <span>{label}</span>
      <Badge size='xs' variant={variant}>{price}</Badge>
    </CalendarDay>
  );
};

/**
 * The children of `CalendarWeeks` are the template of a day: it is rendered
 * once per cell and reads its day with `useCalendarDayContext()`.
 * `CalendarDay` keeps the default behavior and takes custom content. Here
 * every day of the month shows a price; overflow days keep the plain number.
 */
export const CustomCell: Story = {
  args: {
    style: { width: 480 },
    children: <CalendarParts includeOverflowDays day={<PricedDay />} />,
  },
};
