import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC, ReactNode, useState } from 'react';
import { DayPicker } from './DayPicker';
import {
  DayPickerCell,
  DayPickerItem,
  DayPickerLayout,
  DayPickerRow,
  DayPickerRowGroup,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
} from './components';
import { useDayPickerCellContext } from './contexts';
import { createDayPickerGrid } from './helpers';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Code } from '../Code';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { addCalendarMonths, gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate, getNextDate, parseISODate } from '@vega-ui/utils';

const calendarSystems = [
  { name: 'Gregorian', locale: 'en-US', calendar: gregorianCalendar },
  { name: 'Persian', locale: 'fa-IR', calendar: createCalendarSystem('persian') },
  { name: 'Hebrew', locale: 'he-IL', calendar: createCalendarSystem('hebrew') },
  { name: 'Buddhist', locale: 'th-TH', calendar: createCalendarSystem('buddhist') },
  { name: 'Islamic', locale: 'ar-SA', calendar: createCalendarSystem('islamic-umalqura') },
];

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

const MonthScroller: FC = () => (
  <DayPickerScroller>
    <DayPickerScrollerContent>
      <DayPickerScrollerLayout>
        <DayPickerCell />
      </DayPickerScrollerLayout>
    </DayPickerScrollerContent>
  </DayPickerScroller>
);

const meta: Meta<typeof DayPicker> = {
  title: 'Data/DayPicker/DayPicker',
  component: DayPicker,
  parameters: { layout: 'centered' },
  args: {
    children: <DayPickerLayout><DayPickerCell /></DayPickerLayout>,
  },
  argTypes: {
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
 * The current month in the Gregorian calendar. Keyboard focus starts on today.
 */
export const Default: Story = {
  args: {},
};

/**
 * `selection` switches between one day, any set of days, and a range between
 * two days. `defaultSelected` takes a single ISO day or an array of them.
 */
export const SelectionModes: Story = {
  render: () => (
    <Row>
      <Stack>
        <Caption>single</Caption>
        <DayPicker selection='single' defaultSelected={today}>
          <DayPickerLayout>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      </Stack>
      <Stack>
        <Caption>multiple</Caption>
        <DayPicker selection='multiple' defaultSelected={[shift(-3), today, shift(3)]}>
          <DayPickerLayout>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      </Stack>
      <Stack>
        <Caption>range</Caption>
        <DayPicker selection='range' defaultSelected={[shift(-2), shift(4)]}>
          <DayPickerLayout>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
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
    const [selected, setSelected] = useState<string | null>(today);

    return (
      <Row>
        <DayPicker selected={selected} onSelectCell={setSelected}>
          <DayPickerLayout>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
        <Card style={{ minWidth: 220 }}>
          <Stack>
            <Heading as='h3' size={4}>State</Heading>
            <Caption>selected</Caption>
            <Code>{JSON.stringify(selected)}</Code>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size='sm' onClick={() => setSelected(today)}>Today</Button>
              <Button size='sm' variant='secondary' onClick={() => setSelected(null)}>Clear</Button>
            </div>
          </Stack>
        </Card>
      </Row>
    );
  },
};

/**
 * `from` and `to` limit the selectable days; days outside the bounds cannot
 * be selected or focused. Here only the next two weeks are available.
 */
export const Bounds: Story = {
  args: {
    selection: 'range',
    from: today,
    to: shift(14),
  },
};

/**
 * `disabled` takes a day, an array of days or a predicate. Here weekends
 * cannot be picked.
 */
export const DisabledDays: Story = {
  args: {
    selection: 'multiple',
    disabled: isWeekend,
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
          <DayPicker {...props} size={size} defaultSelected={today} />
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
          <DayPicker {...props} variant={variant} defaultSelected={today} />
        </Stack>
      ))}
    </Row>
  ),
};

/**
 * `DayPickerScroller` pages through months by swiping or scrolling.
 * `DayPickerScrollerLayout` renders the month of each page.
 */
export const Swipable: Story = {
  args: {
    selection: 'range',
    children: <MonthScroller />,
  },
};

/**
 * `month` on the root scrolls the pages to that month, and the scroller
 * reports the month in view through `onChangePeriod`, so both stay in sync.
 */
export const SwipableControlled: Story = {
  render: () => {
    const [month, setMonth] = useState(today);

    return (
      <Stack>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button size='sm' variant='secondary' onClick={() => setMonth(addCalendarMonths(gregorianCalendar, month, -1))}>Previous</Button>
          <Code>{month.slice(0, 7)}</Code>
          <Button size='sm' variant='secondary' onClick={() => setMonth(addCalendarMonths(gregorianCalendar, month, 1))}>Next</Button>
        </div>
        <DayPicker month={month}>
          <DayPickerScroller onChangePeriod={setMonth}>
            <DayPickerScrollerContent>
              <DayPickerScrollerLayout>
                <DayPickerCell />
              </DayPickerScrollerLayout>
            </DayPickerScrollerContent>
          </DayPickerScroller>
        </DayPicker>
      </Stack>
    );
  },
};

/**
 * One ISO day shown in several calendar systems. Each picker takes its own
 * `calendar` and `locale`; picking a day in any of them updates all of them.
 */
export const CalendarSystems: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(today);

    return (
      <Stack gap={24}>
        <Text>
          Selected: <Code>{JSON.stringify(selected)}</Code>
        </Text>
        <Row>
          {calendarSystems.map(({ name, locale, calendar }) => (
            <Card key={name}>
              <Stack gap={8}>
                <Heading as='h3' size={4}>{name}</Heading>
                <Caption>{locale}</Caption>
                <DayPicker
                  calendar={calendar}
                  locale={locale}
                  month={selected ?? today}
                  selected={selected}
                  onSelectCell={setSelected}
                >
                  <DayPickerLayout>
                    <DayPickerCell />
                  </DayPickerLayout>
                </DayPicker>
              </Stack>
            </Card>
          ))}
        </Row>
      </Stack>
    );
  },
};

/**
 * `locale` sets the day numerals and the first day of the week: Sunday for
 * `en-US`, Monday for `de-DE`, Saturday for `ar-EG`.
 */
export const Locales: Story = {
  render: (props) => (
    <Row>
      {['en-US', 'de-DE', 'ja-JP', 'ar-EG'].map((locale) => (
        <Stack key={locale}>
          <Caption>{locale}</Caption>
          <DayPicker {...props} locale={locale} defaultSelected={today} />
        </Stack>
      ))}
    </Row>
  ),
};

/**
 * The picker follows the text direction it is rendered in, like native
 * elements: here `dir="rtl"` on a wrapper. Weeks run from right to left,
 * ArrowRight moves to the previous day and ArrowLeft to the next one, and
 * the next month of the scroller is on the left. Direction is never taken
 * from `locale`.
 */
export const RightToLeft: Story = {
  render: (props) => (
    <Row>
      {['ar-EG', 'he-IL'].map((locale) => (
        <Stack key={locale}>
          <Caption>{locale}</Caption>
          <div dir='rtl'>
            <DayPicker {...props} locale={locale} defaultSelected={today}>
              <MonthScroller />
            </DayPicker>
          </div>
        </Stack>
      ))}
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
  const { label, fields, inMonth } = useDayPickerCellContext();

  if (!inMonth || !fields) return <DayPickerCell />;

  const { variant, price } = getPrice(fields.day);

  return (
    <DayPickerCell style={{ display: 'flex', flexDirection: 'column', gap: 4, minHeight: 'min-content', paddingBlock: 8 }}>
      <span>{label}</span>
      <Badge size='xs' variant={variant}>{price}</Badge>
    </DayPickerCell>
  );
};

/**
 * The children of a layout are the template of a day: it is rendered once per
 * cell and reads its day with `useDayPickerCellContext()`. `DayPickerCell`
 * keeps the default behavior and takes custom content. Here every day shows
 * a price.
 */
export const CustomCell: Story = {
  args: {
    style: { width: 420 },
    children: (
      <DayPickerLayout>
        <PricedDay />
      </DayPickerLayout>
    ),
  },
};

/**
 * Full control over the grid: rows and cells are built by hand from
 * `createDayPickerGrid` and rendered with `DayPickerRow` and `DayPickerItem`.
 * Prefer a layout with a cell template; use this only when the layout itself
 * has to change. Inside a scroller, pass `offset` so row indexes stay
 * unique across pages.
 */
export const LowLevelGrid: Story = {
  args: {
    children: (
      <DayPickerRowGroup>
        {createDayPickerGrid({ month: today, includeOverflowDays: true }).map(({ row, data }) => (
          <DayPickerRow row={row} key={row}>
            {data.map(({ col, date, day, inCurrentMonth }) => (
              <DayPickerItem col={col} value={date} excluded={!inCurrentMonth} disabled={!inCurrentMonth} key={col}>
                {day}
              </DayPickerItem>
            ))}
          </DayPickerRow>
        ))}
      </DayPickerRowGroup>
    ),
  },
};
