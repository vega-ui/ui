import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC, ReactNode, useState } from 'react';
import { MonthPicker } from './MonthPicker';
import {
  MonthPickerCell,
  MonthPickerItem,
  MonthPickerLayout,
  MonthPickerRow,
  MonthPickerRowGroup,
} from './components';
import { useMonthPickerCellContext } from './contexts';
import { createMonthPickerGrid } from './helpers';
import { Button } from '../Button';
import { Card } from '../Card';
import { Code } from '../Code';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { addCalendarMonths, formatCalendarDate, getCalendarMonthStart, getCalendarYearStart, gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate } from '@vega-ui/utils';

const calendarSystems = [
  { name: 'Gregorian', locale: 'en-US', calendar: gregorianCalendar, year: undefined, note: '12 months' },
  { name: 'Hebrew, leap year 5784', locale: 'he-IL', calendar: createCalendarSystem('hebrew'), year: '2024-03-01', note: '13 months: Adar I and Adar II' },
  { name: 'Persian', locale: 'fa-IR', calendar: createCalendarSystem('persian'), year: undefined, note: '12 months' },
  { name: 'Islamic', locale: 'ar-SA', calendar: createCalendarSystem('islamic-umalqura'), year: undefined, note: '12 lunar months' },
];

const thisMonth = getCalendarMonthStart(gregorianCalendar, formatISODate(getCurrentDate()));
const shift = (months: number) => addCalendarMonths(gregorianCalendar, thisMonth, months);
const thisYear = getCalendarYearStart(gregorianCalendar, thisMonth);
const monthOfYear = (index: number) => addCalendarMonths(gregorianCalendar, thisYear, index);
const isSummer = (month: string) => [6, 7, 8].includes(gregorianCalendar.toFields(month).month);

const Stack: FC<{ children: ReactNode; gap?: number }> = ({ children, gap = 12 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>
);

const Row: FC<{ children: ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>{children}</div>
);

const Caption: FC<{ children: ReactNode }> = ({ children }) => (
  <Text size={2} style={{ color: 'var(--color-gray-accent-600)' }}>{children}</Text>
);

const meta: Meta<typeof MonthPicker> = {
  title: 'Data/MonthPicker/MonthPicker',
  component: MonthPicker,
  parameters: { layout: 'centered' },
  args: {
    style: { width: 300 },
    children: <MonthPickerLayout><MonthPickerCell /></MonthPickerLayout>,
  },
  argTypes: {
    selection: {
      control: 'radio',
      options: ['single', 'multiple', 'range'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The months of the current year in the Gregorian calendar. Each month is
 * keyed by its first day as an ISO string, e.g. `2026-03-01`.
 */
export const Default: Story = {
  args: {},
};

/**
 * `selection` switches between one month, any set of months, and a range
 * between two months.
 */
export const SelectionModes: Story = {
  render: () => (
    <Row>
      <Stack>
        <Caption>single</Caption>
        <MonthPicker style={{ width: 300 }} selection='single' defaultSelected={thisMonth}>
          <MonthPickerLayout>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
      </Stack>
      <Stack>
        <Caption>multiple</Caption>
        <MonthPicker style={{ width: 300 }} selection='multiple' defaultSelected={[shift(-2), thisMonth, shift(2)]}>
          <MonthPickerLayout>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
      </Stack>
      <Stack>
        <Caption>range</Caption>
        <MonthPicker style={{ width: 300 }} selection='range' defaultSelected={[shift(-1), shift(2)]}>
          <MonthPickerLayout>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
      </Stack>
    </Row>
  ),
};

/**
 * `selected` and `onSelectCell` make the selection controlled. In single mode
 * `null` means controlled with nothing selected.
 */
export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(thisMonth);

    return (
      <Row>
        <MonthPicker style={{ width: 300 }} selected={selected} onSelectCell={setSelected}>
          <MonthPickerLayout>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
        <Card style={{ minWidth: 220 }}>
          <Stack>
            <Heading as='h3' size={4}>State</Heading>
            <Caption>selected</Caption>
            <Code>{JSON.stringify(selected)}</Code>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size='sm' onClick={() => setSelected(thisMonth)}>This month</Button>
              <Button size='sm' variant='secondary' onClick={() => setSelected(null)}>Clear</Button>
            </div>
          </Stack>
        </Card>
      </Row>
    );
  },
};

/**
 * `from` and `to` limit the selectable months; months outside the bounds
 * cannot be selected or focused. Here only March to September of the current
 * year is available.
 */
export const Bounds: Story = {
  args: {
    selection: 'range',
    from: monthOfYear(2),
    to: monthOfYear(8),
  },
};

/**
 * `disabled` takes a month, an array of months or a predicate. Here the
 * summer months cannot be picked.
 */
export const DisabledMonths: Story = {
  args: {
    selection: 'multiple',
    disabled: isSummer,
  },
};

/**
 * Every `size`, from the dense `xs` (the default) to `xl`.
 */
export const Sizes: Story = {
  render: (props) => (
    <Row>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Stack key={size}>
          <Caption>{size}</Caption>
          <MonthPicker {...props} size={size} defaultSelected={thisMonth}>
            <MonthPickerLayout format='short'>
              <MonthPickerCell />
            </MonthPickerLayout>
          </MonthPicker>
        </Stack>
      ))}
    </Row>
  ),
};

/**
 * Both `variant` presets, shown with a selected cell.
 */
export const Variants: Story = {
  render: (props) => (
    <Row>
      {(['primary', 'secondary'] as const).map((variant) => (
        <Stack key={variant}>
          <Caption>{variant}</Caption>
          <MonthPicker {...props} variant={variant} defaultSelected={thisMonth} />
        </Stack>
      ))}
    </Row>
  ),
};

/**
 * The calendar system defines how many months a year has. A Hebrew leap year
 * has 13 months, so the layout adds a row; cells stay keyed by the ISO first
 * day of each month.
 */
export const CalendarSystems: Story = {
  render: () => (
    <Row>
      {calendarSystems.map(({ name, locale, calendar, year, note }) => (
        <Card key={name}>
          <Stack gap={8}>
            <Heading as='h3' size={4}>{name}</Heading>
            <Caption>{locale} · {note}</Caption>
            <MonthPicker style={{ width: 300 }} calendar={calendar} locale={locale} year={year}>
              <MonthPickerLayout>
                <MonthPickerCell />
              </MonthPickerLayout>
            </MonthPicker>
          </Stack>
        </Card>
      ))}
    </Row>
  ),
};

/**
 * `locale` on the root sets the month names of every cell.
 */
export const Locales: Story = {
  render: (props) => (
    <Row>
      {['en-US', 'de-DE', 'ja-JP', 'ar-EG'].map((locale) => (
        <Stack key={locale}>
          <Caption>{locale}</Caption>
          <MonthPicker {...props} locale={locale} defaultSelected={thisMonth} />
        </Stack>
      ))}
    </Row>
  ),
};

/**
 * The picker follows the text direction it is rendered in, like native
 * elements: here `dir="rtl"` on a wrapper. Months run from right to left,
 * ArrowRight moves to the previous month and ArrowLeft to the next one.
 * Direction is never taken from `locale`.
 */
export const RightToLeft: Story = {
  render: (props) => (
    <Row>
      {['ar-EG', 'he-IL'].map((locale) => (
        <Stack key={locale}>
          <Caption>{locale}</Caption>
          <div dir='rtl'>
            <MonthPicker {...props} locale={locale} defaultSelected={thisMonth} />
          </div>
        </Stack>
      ))}
    </Row>
  ),
};

const getSeason = (month: number) => {
  if (month === 12 || month <= 2) return 'Winter';
  if (month <= 5) return 'Spring';
  if (month <= 8) return 'Summer';
  return 'Autumn';
};

const SeasonMonth: FC = () => {
  const { label, fields } = useMonthPickerCellContext();

  return (
    <MonthPickerCell style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingBlock: 6 }}>
      <span style={{ fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 12, color: 'var(--color-gray-accent-600)' }}>{fields ? getSeason(fields.month) : ''}</span>
    </MonthPickerCell>
  );
};

/**
 * The children of `MonthPickerLayout` are the template of a month: it is
 * rendered once per cell and reads its month with
 * `useMonthPickerCellContext()`. Here every month shows its season.
 */
export const CustomCell: Story = {
  args: {
    style: { width: 420 },
    children: (
      <MonthPickerLayout>
        <SeasonMonth />
      </MonthPickerLayout>
    ),
  },
};

/**
 * Full control over the grid: rows and cells are built by hand from
 * `createMonthPickerGrid` and rendered with `MonthPickerRow` and
 * `MonthPickerItem`. Prefer a layout with a cell template; use this only when
 * the layout itself has to change.
 */
export const LowLevelGrid: Story = {
  args: {
    style: { width: 400 },
    children: (
      <MonthPickerRowGroup>
        {createMonthPickerGrid({ cols: 4 }).map(({ row, data }) => (
          <MonthPickerRow row={row} key={row}>
            {data.map(({ col, month }) => (
              <MonthPickerItem col={col} value={month} key={month}>
                {formatCalendarDate(gregorianCalendar, month, 'en-US', { month: 'short' })}
              </MonthPickerItem>
            ))}
          </MonthPickerRow>
        ))}
      </MonthPickerRowGroup>
    ),
  },
};
