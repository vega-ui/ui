import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC, ReactNode, useState } from 'react';
import { YearPicker } from './YearPicker';
import {
  YearPickerCell,
  YearPickerItem,
  YearPickerLayout,
  YearPickerRow,
  YearPickerRowGroup,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from './components';
import { useYearPickerCellContext } from './contexts';
import { createYearPickerGrid } from './helpers';
import { Button } from '../Button';
import { Card } from '../Card';
import { Code } from '../Code';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { addCalendarYears, getCalendarYearStart, gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate } from '@vega-ui/utils';

const calendarSystems = [
  { name: 'Japanese', locale: 'ja-JP', calendar: createCalendarSystem('japanese'), year: '2019-05-01', start: '2014-01-01', note: 'Heisei 31 is followed by Reiwa 1 in 2019' },
  { name: 'Buddhist', locale: 'th-TH', calendar: createCalendarSystem('buddhist'), year: undefined, start: undefined, note: 'Years count from 543 BCE' },
  { name: 'Persian', locale: 'fa-IR', calendar: createCalendarSystem('persian'), year: undefined, start: undefined, note: 'Years start at Nowruz in March' },
  { name: 'Islamic', locale: 'ar-SA', calendar: createCalendarSystem('islamic-umalqura'), year: undefined, start: undefined, note: 'Lunar years of 354 or 355 days' },
];

const thisYear = getCalendarYearStart(gregorianCalendar, formatISODate(getCurrentDate()));
const shift = (years: number) => addCalendarYears(gregorianCalendar, thisYear, years);

const zodiac = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];

const Stack: FC<{ children: ReactNode; gap?: number }> = ({ children, gap = 12 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>
);

const Row: FC<{ children: ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>{children}</div>
);

const Caption: FC<{ children: ReactNode }> = ({ children }) => (
  <Text size={2} style={{ color: 'var(--color-gray-accent-600)' }}>{children}</Text>
);

const YearScroller: FC = () => (
  <YearPickerScroller>
    <YearPickerScrollerContent>
      <YearPickerScrollerLayout>
        <YearPickerCell />
      </YearPickerScrollerLayout>
    </YearPickerScrollerContent>
  </YearPickerScroller>
);

const meta: Meta<typeof YearPicker> = {
  title: 'Data/YearPicker/YearPicker',
  component: YearPicker,
  parameters: { layout: 'centered' },
  args: {
    children: <YearPickerLayout><YearPickerCell /></YearPickerLayout>,
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
 * A page of 12 years starting from the current year. Each year is keyed by
 * its first day as an ISO string, e.g. `2026-01-01`.
 */
export const Default: Story = {
  args: {},
};

/**
 * `selection` switches between one year, any set of years, and a range
 * between two years.
 */
export const SelectionModes: Story = {
  render: () => (
    <Row>
      <Stack>
        <Caption>single</Caption>
        <YearPicker selection='single' defaultSelected={thisYear}>
          <YearPickerLayout>
            <YearPickerCell />
          </YearPickerLayout>
        </YearPicker>
      </Stack>
      <Stack>
        <Caption>multiple</Caption>
        <YearPicker selection='multiple' defaultSelected={[thisYear, shift(2), shift(5)]}>
          <YearPickerLayout>
            <YearPickerCell />
          </YearPickerLayout>
        </YearPicker>
      </Stack>
      <Stack>
        <Caption>range</Caption>
        <YearPicker selection='range' defaultSelected={[shift(1), shift(4)]}>
          <YearPickerLayout>
            <YearPickerCell />
          </YearPickerLayout>
        </YearPicker>
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
    const [selected, setSelected] = useState<string | null>(thisYear);

    return (
      <Row>
        <YearPicker selected={selected} onSelectCell={setSelected}>
          <YearPickerLayout>
            <YearPickerCell />
          </YearPickerLayout>
        </YearPicker>
        <Card style={{ minWidth: 220 }}>
          <Stack>
            <Heading as='h3' size={4}>State</Heading>
            <Caption>selected</Caption>
            <Code>{JSON.stringify(selected)}</Code>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size='sm' onClick={() => setSelected(thisYear)}>This year</Button>
              <Button size='sm' variant='secondary' onClick={() => setSelected(null)}>Clear</Button>
            </div>
          </Stack>
        </Card>
      </Row>
    );
  },
};

/**
 * `from` and `to` limit the selectable years; years outside the bounds
 * cannot be selected or focused. The layout `start` shows a page around them.
 */
export const Bounds: Story = {
  args: {
    selection: 'range',
    from: shift(-2),
    to: shift(2),
    children: <YearPickerLayout start={shift(-6)}><YearPickerCell /></YearPickerLayout>,
  },
};

/**
 * `disabled` takes a year, an array of years or a predicate. Here the next
 * year and the year after it cannot be picked.
 */
export const DisabledYears: Story = {
  args: {
    selection: 'multiple',
    disabled: [shift(1), shift(2)],
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
          <YearPicker {...props} size={size} defaultSelected={thisYear} />
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
          <YearPicker {...props} variant={variant} defaultSelected={thisYear} />
        </Stack>
      ))}
    </Row>
  ),
};

/**
 * `YearPickerScroller` pages through years by swiping or scrolling.
 * `YearPickerScrollerLayout` renders the years of each page. A page can hold
 * any number of years: `period` on the scroller must match `rows × cols` of
 * the layout, so a `year` maps to the page that holds it.
 */
export const Swipable: Story = {
  args: {
    selection: 'range',
    children: (
      <YearPickerScroller period={20}>
        <YearPickerScrollerContent>
          <YearPickerScrollerLayout rows={5} cols={4}>
            <YearPickerCell />
          </YearPickerScrollerLayout>
        </YearPickerScrollerContent>
      </YearPickerScroller>
    ),
  },
};

/**
 * `year` on the root scrolls the pages to the page that contains it, and the
 * scroller reports the first year of the page in view through
 * `onChangePeriod`, so both stay in sync.
 */
export const SwipableControlled: Story = {
  render: () => {
    const [year, setYear] = useState(thisYear);

    return (
      <Stack>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button size='sm' variant='secondary' onClick={() => setYear(addCalendarYears(gregorianCalendar, year, -12))}>−12 years</Button>
          <Code>{year.slice(0, 4)}</Code>
          <Button size='sm' variant='secondary' onClick={() => setYear(addCalendarYears(gregorianCalendar, year, 12))}>+12 years</Button>
        </div>
        <YearPicker year={year}>
          <YearPickerScroller onChangePeriod={setYear}>
            <YearPickerScrollerContent>
              <YearPickerScrollerLayout>
                <YearPickerCell />
              </YearPickerScrollerLayout>
            </YearPickerScrollerContent>
          </YearPickerScroller>
        </YearPicker>
      </Stack>
    );
  },
};

/**
 * Years in several calendar systems, each with its own `calendar` and
 * `locale`. The Japanese page crosses the change from the Heisei to the
 * Reiwa era: 2019 holds two cells, Heisei 31 and Reiwa 1.
 */
export const CalendarSystems: Story = {
  render: () => (
    <Row>
      {calendarSystems.map(({ name, locale, calendar, year, start, note }) => (
        <Card key={name}>
          <Stack gap={8}>
            <Heading as='h3' size={4}>{name}</Heading>
            <Caption>{locale} · {note}</Caption>
            <YearPicker calendar={calendar} locale={locale} year={year}>
              <YearPickerLayout start={start}>
                <YearPickerCell />
              </YearPickerLayout>
            </YearPicker>
          </Stack>
        </Card>
      ))}
    </Row>
  ),
};

/**
 * `locale` on the root sets the numerals of every year label.
 */
export const Locales: Story = {
  render: (props) => (
    <Row>
      {['en-US', 'ar-EG', 'fa-IR', 'hi-IN-u-nu-deva'].map((locale) => (
        <Stack key={locale}>
          <Caption>{locale}</Caption>
          <YearPicker {...props} locale={locale} defaultSelected={thisYear} />
        </Stack>
      ))}
    </Row>
  ),
};

/**
 * The picker follows the text direction it is rendered in, like native
 * elements: here `dir="rtl"` on a wrapper. Years run from right to left,
 * ArrowRight moves to the previous year and ArrowLeft to the next one, and
 * the next page of the scroller is on the left. Direction is never taken
 * from `locale`.
 */
export const RightToLeft: Story = {
  render: (props) => (
    <Row>
      {['ar-EG', 'he-IL'].map((locale) => (
        <Stack key={locale}>
          <Caption>{locale}</Caption>
          <div dir='rtl'>
            <YearPicker {...props} locale={locale} defaultSelected={thisYear}>
              <YearScroller />
            </YearPicker>
          </div>
        </Stack>
      ))}
    </Row>
  ),
};

const ZodiacYear: FC = () => {
  const { label, fields } = useYearPickerCellContext();

  return (
    <YearPickerCell style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingBlock: 6 }}>
      <span style={{ fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 12, color: 'var(--color-gray-accent-600)' }}>{fields ? zodiac[fields.year % 12] : ''}</span>
    </YearPickerCell>
  );
};

/**
 * The children of `YearPickerLayout` are the template of a year: it is
 * rendered once per cell and reads its year with `useYearPickerCellContext()`.
 * Here every year shows its Chinese zodiac animal.
 */
export const CustomCell: Story = {
  args: {
    style: { width: 360 },
    children: (
      <YearPickerLayout>
        <ZodiacYear />
      </YearPickerLayout>
    ),
  },
};

/**
 * Full control over the grid: rows and cells are built by hand from
 * `createYearPickerGrid` and rendered with `YearPickerRow` and
 * `YearPickerItem`. Prefer a layout with a cell template; use this only when
 * the layout itself has to change.
 */
export const LowLevelGrid: Story = {
  args: {
    children: (
      <YearPickerRowGroup>
        {createYearPickerGrid({ start: shift(-12), rows: 5, cols: 5 }).map(({ row, data }) => (
          <YearPickerRow row={row} key={row}>
            {data.map(({ col, year }) => (
              <YearPickerItem col={col} value={year} key={year}>
                {year.slice(0, 4)}
              </YearPickerItem>
            ))}
          </YearPickerRow>
        ))}
      </YearPickerRowGroup>
    ),
  },
};
