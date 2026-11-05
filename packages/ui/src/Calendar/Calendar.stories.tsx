import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC } from 'react';
import { Calendar, CalendarProps } from './Calendar';
import {
  CalendarDay,
  CalendarContent,
  CalendarDays,
  CalendarHeader,
  CalendarMonthLabel,
  CalendarMonthLabelProps,
  CalendarMonth,
  CalendarMonths,
  CalendarMonthsProps,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekdays, CalendarWeekday,
  CalendarWeekdaysProps,
  CalendarWeeks,
  CalendarWeeksProps,
  CalendarYearLabel,
  CalendarYearLabelProps,
  CalendarYear,
  CalendarYears,
  CalendarYearsProps,
} from './components';
import { Text } from '../Text';
import { gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate, getNextDate, parseISODate } from '@vega-ui/utils';

interface CalendarPartsProps {
  monthLabel?: CalendarMonthLabelProps['format'];
  yearLabel?: CalendarYearLabelProps['format'];
  weekday?: CalendarWeekdaysProps['format'];
  day?: CalendarWeeksProps['format'];
  includeOverflowDays?: boolean;
  monthCols?: CalendarMonthsProps['cols'];
  month?: CalendarMonthsProps['format'];
  year?: CalendarYearsProps['format'];
}

const CalendarParts: FC<CalendarPartsProps> = ({ monthLabel, yearLabel, weekday = 'short', day, includeOverflowDays, monthCols, month, year }) => (
  <>
    <CalendarHeader>
      <CalendarPrevButton aria-label='Previous' />
      <CalendarViewButtonGroup>
        <CalendarViewButton view='month'>
          <CalendarMonthLabel format={monthLabel} />
        </CalendarViewButton>
        <CalendarViewButton view='year'>
          <CalendarYearLabel format={yearLabel} />
        </CalendarViewButton>
      </CalendarViewButtonGroup>
      <CalendarNextButton aria-label='Next' />
    </CalendarHeader>
    <CalendarContent>
      <CalendarDays>
        <CalendarWeekdays format={weekday}>
          <CalendarWeekday />
        </CalendarWeekdays>
        <CalendarWeeks format={day} includeOverflowDays={includeOverflowDays}>
          <CalendarDay />
        </CalendarWeeks>
      </CalendarDays>
      <CalendarMonths cols={monthCols} format={month}>
        <CalendarMonth />
      </CalendarMonths>
      <CalendarYears format={year}>
        <CalendarYear />
      </CalendarYears>
    </CalendarContent>
  </>
);

const meta = {
  title: 'Data/Calendar',
  component: Calendar,
  subcomponents: {
    CalendarHeader,
    CalendarPrevButton,
    CalendarNextButton,
    CalendarViewButtonGroup,
    CalendarViewButton,
    CalendarMonthLabel,
    CalendarYearLabel,
    CalendarContent,
    CalendarDays,
    CalendarWeekdays,
    CalendarWeekday,
    CalendarWeeks,
    CalendarDay,
    CalendarMonths,
    CalendarMonth,
    CalendarYears,
    CalendarYear,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
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
    defaultView: {
      control: 'radio',
      options: ['day', 'month', 'year'],
    },
    defaultMonth: {
      control: 'text',
    },
    min: {
      control: 'text',
    },
    max: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    children: <CalendarParts />,
  },
} satisfies Meta<typeof Calendar>;

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

const sizes: CalendarProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const variants: CalendarProps['variant'][] = ['primary', 'secondary'];
const locales = ['en-US', 'de-DE', 'ja-JP', 'ar-EG'];

const calendarSystems = [
  { name: 'Gregorian', locale: 'en-US', calendar: gregorianCalendar },
  { name: 'Persian', locale: 'fa-IR', calendar: createCalendarSystem('persian') },
  { name: 'Hebrew', locale: 'he-IL', calendar: createCalendarSystem('hebrew') },
  { name: 'Buddhist', locale: 'th-TH', calendar: createCalendarSystem('buddhist') },
  { name: 'Islamic', locale: 'ar-SA', calendar: createCalendarSystem('islamic-umalqura') },
];

const formats: { caption: string; view?: CalendarProps['defaultView']; parts: CalendarPartsProps }[] = [
  { caption: 'overflow days', parts: { includeOverflowDays: true } },
  { caption: 'month short, year numeric, weekday short, day numeric', parts: { monthLabel: 'short', yearLabel: 'numeric', weekday: 'short', day: 'numeric' } },
  { caption: 'month narrow, year 2-digit, weekday narrow, day 2-digit', parts: { monthLabel: 'narrow', yearLabel: '2-digit', weekday: 'narrow', day: '2-digit' } },
  { caption: 'month view, 4 columns, short', view: 'month', parts: { monthCols: 4, month: 'short' } },
  { caption: 'year view, 2-digit', view: 'year', parts: { year: '2-digit' } },
];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={grid}>
      {variants.map((variant) => sizes.map((size) => (
        <div key={`${variant}-${size}`} style={cell}>
          <Text size={2}>{`${variant} / ${size}`}</Text>
          <Calendar compact variant={variant} size={size} defaultValue={today}>
            <CalendarParts />
          </Calendar>
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
        <Calendar compact selection='single' defaultValue={today}>
          <CalendarParts />
        </Calendar>
      </div>
      <div style={cell}>
        <Text size={2}>multiple</Text>
        <Calendar compact selection='multiple' defaultValue={[shift(-3), today, shift(3)]}>
          <CalendarParts />
        </Calendar>
      </div>
      <div style={cell}>
        <Text size={2}>range</Text>
        <Calendar compact selection='range' defaultValue={[shift(-2), shift(4)]}>
          <CalendarParts />
        </Calendar>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={grid}>
      <div style={cell}>
        <Text size={2}>min / max</Text>
        <Calendar compact min={shift(-7)} max={shift(30)}>
          <CalendarParts />
        </Calendar>
      </div>
      <div style={cell}>
        <Text size={2}>disabledDates</Text>
        <Calendar compact disabledDates={isWeekend}>
          <CalendarParts />
        </Calendar>
      </div>
      <div style={cell}>
        <Text size={2}>disabled</Text>
        <Calendar compact disabled defaultValue={today}>
          <CalendarParts />
        </Calendar>
      </div>
    </div>
  ),
};

export const Formats: Story = {
  render: () => (
    <div style={grid}>
      {formats.map(({ caption, view, parts }) => (
        <div key={caption} style={cell}>
          <Text size={2}>{caption}</Text>
          <Calendar compact defaultView={view}>
            <CalendarParts {...parts} />
          </Calendar>
        </div>
      ))}
    </div>
  ),
};

export const Locales: Story = {
  render: () => (
    <div style={grid}>
      {locales.map((locale) => (
        <div key={locale} style={cell}>
          <Text size={2}>{locale}</Text>
          <Calendar compact locale={locale} defaultValue={today}>
            <CalendarParts />
          </Calendar>
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
          <Calendar compact locale={locale} calendar={calendar} defaultValue={today}>
            <CalendarParts weekday='narrow' />
          </Calendar>
        </div>
      ))}
    </div>
  ),
};
