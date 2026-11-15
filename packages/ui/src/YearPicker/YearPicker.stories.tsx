import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPicker, YearPickerProps } from './YearPicker';
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
import { addCalendarYears, getCalendarYearStart, gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate } from '@vega-ui/utils';
import type { GridSelection } from '../Grid';

const meta = {
  title: 'Data/YearPicker',
  component: YearPicker,
  subcomponents: {
    YearPickerRow,
    YearPickerItem,
    YearPickerLayout,
    YearPickerRowGroup,
    YearPickerScroller,
    YearPickerScrollerLayout,
    YearPickerScrollerContent,
    YearPickerCell,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
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
  args: {
    'aria-label': 'Year',
    children: <YearPickerLayout><YearPickerCell /></YearPickerLayout>,
  },
} satisfies Meta<typeof YearPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const thisYear = getCalendarYearStart(gregorianCalendar, formatISODate(getCurrentDate()));
const shift = (years: number) => addCalendarYears(gregorianCalendar, thisYear, years);

const variants: YearPickerProps['variant'][] = ['primary', 'secondary'];
const sizes: YearPickerProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];

const states: { label: string; start?: string; props: YearPickerProps<GridSelection> }[] = [
  { label: 'single', props: { selection: 'single', defaultValue: thisYear } },
  { label: 'multiple', props: { selection: 'multiple', defaultValue: [thisYear, shift(2), shift(5)] } },
  { label: 'range', props: { selection: 'range', defaultValue: [shift(1), shift(4)] } },
  { label: 'min / max', start: shift(-6), props: { selection: 'range', min: shift(-2), max: shift(2) } },
  { label: 'disabled', props: { selection: 'multiple', disabledDates: [shift(1), shift(2)] } },
];

const calendarSystems = [
  { name: 'Japanese', locale: 'ja-JP', calendar: createCalendarSystem('japanese'), year: '2019-05-01', start: '2014-01-01' },
  { name: 'Buddhist', locale: 'th-TH', calendar: createCalendarSystem('buddhist'), year: undefined, start: undefined },
  { name: 'Persian', locale: 'fa-IR', calendar: createCalendarSystem('persian'), year: undefined, start: undefined },
  { name: 'Islamic', locale: 'ar-SA', calendar: createCalendarSystem('islamic-umalqura'), year: undefined, start: undefined },
];

const locales = ['en-US', 'ar-EG', 'fa-IR', 'hi-IN-u-nu-deva'];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 24, alignItems: 'start' }}>
      {variants.map((variant) => sizes.map((size) => (
        <div key={`${variant}-${size}`} style={{ display: 'grid', gap: 8 }}>
          <span>{`${variant} / ${size}`}</span>
          <YearPicker aria-label='Year' variant={variant} size={size} defaultValue={thisYear}>
            <YearPickerLayout>
              <YearPickerCell />
            </YearPickerLayout>
          </YearPicker>
        </div>
      )))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'start' }}>
      {states.map(({ label, start, props }) => (
        <div key={label} style={{ display: 'grid', gap: 8 }}>
          <span>{label}</span>
          <YearPicker aria-label='Year' {...props}>
            <YearPickerLayout start={start}>
              <YearPickerCell />
            </YearPickerLayout>
          </YearPicker>
        </div>
      ))}
    </div>
  ),
};

export const Swipable: Story = {
  args: {
    selection: 'range',
    period: 20,
    children: (
      <YearPickerScroller>
        <YearPickerScrollerContent>
          <YearPickerScrollerLayout rows={5} cols={4}>
            <YearPickerCell />
          </YearPickerScrollerLayout>
        </YearPickerScrollerContent>
      </YearPickerScroller>
    ),
  },
};

export const CalendarSystems: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'start' }}>
      {calendarSystems.map(({ name, locale, calendar, year, start }) => (
        <div key={name} style={{ display: 'grid', gap: 8 }}>
          <span>{`${name} / ${locale}`}</span>
          <YearPicker aria-label='Year' calendar={calendar} locale={locale} defaultFocusedDate={year}>
            <YearPickerLayout start={start}>
              <YearPickerCell />
            </YearPickerLayout>
          </YearPicker>
        </div>
      ))}
    </div>
  ),
};

export const Locales: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'start' }}>
      {locales.map((locale) => (
        <div key={locale} style={{ display: 'grid', gap: 8 }}>
          <span>{locale}</span>
          <YearPicker aria-label='Year' locale={locale} defaultValue={thisYear}>
            <YearPickerLayout>
              <YearPickerCell />
            </YearPickerLayout>
          </YearPicker>
        </div>
      ))}
    </div>
  ),
};
