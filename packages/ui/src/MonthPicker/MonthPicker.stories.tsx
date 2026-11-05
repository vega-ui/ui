import type { Meta, StoryObj } from '@storybook/react-vite';
import { MonthPicker, MonthPickerProps } from './MonthPicker';
import {
  MonthPickerCell,
  MonthPickerItem,
  MonthPickerLayout,
  MonthPickerRow,
  MonthPickerRowGroup,
} from './components';
import { addCalendarMonths, getCalendarMonthStart, getCalendarYearStart, gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate } from '@vega-ui/utils';
import type { DataGridSelection } from '../DataGridSelectable';

const meta = {
  title: 'Data/MonthPicker',
  component: MonthPicker,
  subcomponents: {
    MonthPickerRow,
    MonthPickerItem,
    MonthPickerLayout,
    MonthPickerRowGroup,
    MonthPickerCell,
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
    'aria-label': 'Month',
    style: { width: 300 },
    children: <MonthPickerLayout><MonthPickerCell /></MonthPickerLayout>,
  },
} satisfies Meta<typeof MonthPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const thisMonth = getCalendarMonthStart(gregorianCalendar, formatISODate(getCurrentDate()));
const thisYear = getCalendarYearStart(gregorianCalendar, thisMonth);
const shift = (months: number) => addCalendarMonths(gregorianCalendar, thisMonth, months);
const monthOfYear = (index: number) => addCalendarMonths(gregorianCalendar, thisYear, index);
const isSummer = (month: string) => [6, 7, 8].includes(gregorianCalendar.toFields(month).month);

const variants: MonthPickerProps['variant'][] = ['primary', 'secondary'];
const sizes: MonthPickerProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];

const states: { label: string; props: MonthPickerProps<DataGridSelection> }[] = [
  { label: 'single', props: { selection: 'single', defaultSelected: thisMonth } },
  { label: 'multiple', props: { selection: 'multiple', defaultSelected: [shift(-2), thisMonth, shift(2)] } },
  { label: 'range', props: { selection: 'range', defaultSelected: [shift(-1), shift(2)] } },
  { label: 'from / to', props: { selection: 'range', from: monthOfYear(2), to: monthOfYear(8) } },
  { label: 'disabled', props: { selection: 'multiple', disabled: isSummer } },
];

const calendarSystems = [
  { name: 'Gregorian', locale: 'en-US', calendar: gregorianCalendar, year: undefined },
  { name: 'Hebrew, leap year 5784', locale: 'he-IL', calendar: createCalendarSystem('hebrew'), year: '2024-03-01' },
  { name: 'Persian', locale: 'fa-IR', calendar: createCalendarSystem('persian'), year: undefined },
  { name: 'Islamic', locale: 'ar-SA', calendar: createCalendarSystem('islamic-umalqura'), year: undefined },
];

const locales = ['en-US', 'de-DE', 'ja-JP', 'ar-EG'];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 24, alignItems: 'start' }}>
      {variants.map((variant) => sizes.map((size) => (
        <div key={`${variant}-${size}`} style={{ display: 'grid', gap: 8 }}>
          <span>{`${variant} / ${size}`}</span>
          <MonthPicker aria-label='Month' variant={variant} size={size} defaultSelected={thisMonth}>
            <MonthPickerLayout format='short'>
              <MonthPickerCell />
            </MonthPickerLayout>
          </MonthPicker>
        </div>
      )))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'start' }}>
      {states.map(({ label, props }) => (
        <div key={label} style={{ display: 'grid', gap: 8 }}>
          <span>{label}</span>
          <MonthPicker aria-label='Month' style={{ width: 300 }} {...props}>
            <MonthPickerLayout>
              <MonthPickerCell />
            </MonthPickerLayout>
          </MonthPicker>
        </div>
      ))}
    </div>
  ),
};

export const CalendarSystems: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'start' }}>
      {calendarSystems.map(({ name, locale, calendar, year }) => (
        <div key={name} style={{ display: 'grid', gap: 8 }}>
          <span>{`${name} / ${locale}`}</span>
          <MonthPicker aria-label='Month' style={{ width: 300 }} calendar={calendar} locale={locale} year={year}>
            <MonthPickerLayout>
              <MonthPickerCell />
            </MonthPickerLayout>
          </MonthPicker>
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
          <MonthPicker aria-label='Month' style={{ width: 300 }} locale={locale} defaultSelected={thisMonth}>
            <MonthPickerLayout>
              <MonthPickerCell />
            </MonthPickerLayout>
          </MonthPicker>
        </div>
      ))}
    </div>
  ),
};
