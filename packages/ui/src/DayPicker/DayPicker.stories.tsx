import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPicker, DayPickerProps } from './DayPicker';
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
import { Text } from '../Text';
import { gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate, getNextDate, parseISODate } from '@vega-ui/utils';

const meta = {
  title: 'Data/DayPicker',
  component: DayPicker,
  subcomponents: {
    DayPickerRow,
    DayPickerItem,
    DayPickerLayout,
    DayPickerRowGroup,
    DayPickerScroller,
    DayPickerScrollerLayout,
    DayPickerScrollerContent,
    DayPickerCell,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
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
  args: {
    'aria-label': 'Days',
    children: <DayPickerLayout><DayPickerCell /></DayPickerLayout>,
  },
} satisfies Meta<typeof DayPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const today = formatISODate(getCurrentDate());
const shift = (days: number) => formatISODate(getNextDate(getCurrentDate(), days));
const isWeekend = (date: string) => {
  const weekday = parseISODate(date)?.getDay();

  return weekday === 0 || weekday === 6;
};

const grid = { display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' } as const;
const cell = { display: 'flex', flexDirection: 'column', gap: 8 } as const;

const sizes: DayPickerProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const variants: DayPickerProps['variant'][] = ['primary', 'secondary'];
const locales = ['en-US', 'de-DE', 'ja-JP', 'ar-EG'];

const calendarSystems = [
  { name: 'Gregorian', locale: 'en-US', calendar: gregorianCalendar },
  { name: 'Persian', locale: 'fa-IR', calendar: createCalendarSystem('persian') },
  { name: 'Hebrew', locale: 'he-IL', calendar: createCalendarSystem('hebrew') },
  { name: 'Buddhist', locale: 'th-TH', calendar: createCalendarSystem('buddhist') },
  { name: 'Islamic', locale: 'ar-SA', calendar: createCalendarSystem('islamic-umalqura') },
];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={grid}>
      {variants.map((variant) => sizes.map((size) => (
        <div key={`${variant}-${size}`} style={cell}>
          <Text size={2}>{`${variant} / ${size}`}</Text>
          <DayPicker aria-label='Days' variant={variant} size={size} defaultSelected={today}>
            <DayPickerLayout>
              <DayPickerCell />
            </DayPickerLayout>
          </DayPicker>
        </div>
      )))}
    </div>
  ),
};

export const SelectionModes: Story = {
  render: () => (
    <div style={grid}>
      <div style={cell}>
        <Text size={2}>single</Text>
        <DayPicker aria-label='Days' selection='single' defaultSelected={today}>
          <DayPickerLayout>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      </div>
      <div style={cell}>
        <Text size={2}>multiple</Text>
        <DayPicker aria-label='Days' selection='multiple' defaultSelected={[shift(-3), today, shift(3)]}>
          <DayPickerLayout>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      </div>
      <div style={cell}>
        <Text size={2}>range</Text>
        <DayPicker aria-label='Days' selection='range' defaultSelected={[shift(-2), shift(4)]}>
          <DayPickerLayout>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={grid}>
      <div style={cell}>
        <Text size={2}>from / to</Text>
        <DayPicker aria-label='Days' selection='range' from={today} to={shift(14)}>
          <DayPickerLayout>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      </div>
      <div style={cell}>
        <Text size={2}>disabled</Text>
        <DayPicker aria-label='Days' selection='multiple' disabled={isWeekend}>
          <DayPickerLayout>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      </div>
    </div>
  ),
};

export const Swipable: Story = {
  args: {
    selection: 'range',
    children: (
      <DayPickerScroller>
        <DayPickerScrollerContent>
          <DayPickerScrollerLayout>
            <DayPickerCell />
          </DayPickerScrollerLayout>
        </DayPickerScrollerContent>
      </DayPickerScroller>
    ),
  },
};

export const Locales: Story = {
  render: () => (
    <div style={grid}>
      {locales.map((locale) => (
        <div key={locale} style={cell}>
          <Text size={2}>{locale}</Text>
          <DayPicker aria-label='Days' locale={locale} defaultSelected={today}>
            <DayPickerLayout>
              <DayPickerCell />
            </DayPickerLayout>
          </DayPicker>
        </div>
      ))}
    </div>
  ),
};

export const CalendarSystems: Story = {
  render: () => (
    <div style={grid}>
      {calendarSystems.map(({ name, locale, calendar }) => (
        <div key={name} style={cell}>
          <Text size={2}>{`${name} / ${locale}`}</Text>
          <DayPicker aria-label='Days' calendar={calendar} locale={locale} defaultSelected={today}>
            <DayPickerLayout>
              <DayPickerCell />
            </DayPickerLayout>
          </DayPicker>
        </div>
      ))}
    </div>
  ),
};
