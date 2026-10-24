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
import { CalendarSystem, formatCalendarDate, gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate, getNextDate, parseISODate } from '@vega-ui/utils';

const calendarSystems = [
  { name: 'Gregorian', locale: 'en-US', calendar: gregorianCalendar, format: 'MM/DD/YYYY', separator: '/' },
  { name: 'Persian', locale: 'fa-IR', calendar: createCalendarSystem('persian'), format: 'YYYY/MM/DD', separator: '/' },
  { name: 'Hebrew', locale: 'he-IL', calendar: createCalendarSystem('hebrew'), format: 'DD.MM.YYYY', separator: '.' },
  { name: 'Buddhist', locale: 'th-TH', calendar: createCalendarSystem('buddhist'), format: 'DD/MM/YYYY', separator: '/' },
  { name: 'Islamic', locale: 'ar-SA', calendar: createCalendarSystem('islamic-umalqura'), format: 'DD/MM/YYYY', separator: '/' },
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
      control: 'boolean'
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
    }
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const DefaultValue: Story = {
  args: {
    defaultValue: today,
  },
};

export const DefaultMonth: Story = {
  args: {
    defaultMonth: '2020-01-01',
  },
};

export const MinMax: Story = {
  name: 'Min and max',
  args: {
    min: shift(-7),
    max: shift(30),
  },
};

export const DisabledDates: Story = {
  name: 'Disabled dates (weekends)',
  args: {
    disabledDates: isWeekend,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: today,
  },
};

export const MultipleSelection: Story = {
  args: {
    selection: 'multiple',
    defaultValue: [shift(-3), today, shift(3)],
  },
};

export const RangeSelection: Story = {
  args: {
    selection: 'range',
    defaultValue: [shift(-2), shift(4)],
  },
};

export const Variants: Story = {
  render: (props) => (
    <Row>
      {(['primary', 'secondary'] as const).map((variant) => (
        <Stack key={variant}>
          <Caption>{variant}</Caption>
          <Calendar {...props} compact variant={variant} defaultValue={today} />
        </Stack>
      ))}
    </Row>
  ),
};

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
  render: (props) => (
    <Row>
      {['en-US', 'de-DE', 'ja-JP', 'ar-EG'].map((locale) => (
        <Stack key={locale}>
          <Caption>{locale}</Caption>
          <Calendar {...props} compact locale={locale} defaultValue={today} />
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
 * A booking calendar: past days are unavailable through `min`, weekends
 * through a `disabledDates` predicate, and the range is summarized aside.
 */
export const Booking: Story = {
  render: () => {
    const [[start, end], setRange] = useState<[string, string]>(['', '']);

    const startDate = parseISODate(start);
    const endDate = parseISODate(end);
    const nights = startDate && endDate ? Math.round((endDate.getTime() - startDate.getTime()) / 86_400_000) : 0;

    const format = (date: string) => date ? formatCalendarDate(calendarSystems[0].calendar, date, navigator.language, { dateStyle: 'medium' }) : '—';

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

const CalendarSystemCard: FC<CalendarSystemCardProps> = ({ name, locale, calendar, value, onChangeValue }) => {
  return (
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
};

/**
 * One ISO value shown in several calendar systems. Each calendar takes its
 * `locale` and `calendar` props; picking a day in any of
 * them updates all of them.
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
  render: (props) => (
    <Row>
      <Calendar {...props} compact defaultValue={today} />
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

const DateBadge: FC<{ day?: number }> = ({ day }) => {
  if (!day) return <Fragment />

  if (day % 6 === 0) return <Badge size='xs'>30$</Badge>
  if (day % 5 === 0) return <Badge variant='info' size='xs'>39$</Badge>
  if (day % 2 === 0) return <Badge variant='error' size='xs'>120$</Badge>
  return <Badge variant='warning' size='xs'>50$</Badge>
}

const PricedDay: FC = () => {
  const { label, fields } = useCalendarDayContext()

  return (
    <CalendarDay style={{ display: 'flex', flexDirection: 'column', gap: 4, minHeight: 'min-content', paddingBlock: 12 }}>
      <span>{label}</span>
      <DateBadge day={fields?.day} />
    </CalendarDay>
  )
}

/**
 * Days can render any content: the children of `CalendarWeeks` are the
 * template of a day, which reads its day with `useCalendarDayContext()`.
 * Here every day shows a price.
 */
export const CustomDayContent: Story = {
  args: {
    style: { width: 480 },
    children: (
      <CalendarParts includeOverflowDays day={<PricedDay />} />
    )
  },
};
