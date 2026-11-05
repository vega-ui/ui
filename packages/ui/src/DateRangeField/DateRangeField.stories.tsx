import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC, ReactNode } from 'react';

import { DateRangeField, DateRangeFieldProps } from './DateRangeField';
import { DateRangeFieldCalendar, DateRangeFieldInput, DateRangeFieldInputProps, DateRangeFieldTriggerIconButton } from './components';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Label } from '../Label';
import {
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
  CalendarWeekdays,
  CalendarWeekday,
  CalendarDay,
  CalendarWeeks,
  CalendarYearLabel,
  CalendarYear,
  CalendarYears,
} from '../Calendar';
import { gregorianCalendar, createCalendarSystem, getDateFormat, getDateSeparator } from '@vega-ui/i18n';

const calendars = {
  gregorian: gregorianCalendar,
  persian: createCalendarSystem('persian'),
  hebrew: createCalendarSystem('hebrew'),
  buddhist: createCalendarSystem('buddhist'),
  'islamic-umalqura': createCalendarSystem('islamic-umalqura'),
};

const calendarSystems = [
  { name: 'Gregorian', locale: 'en-US', calendar: calendars.gregorian },
  { name: 'Persian', locale: 'fa-IR', calendar: calendars.persian },
  { name: 'Hebrew', locale: 'he-IL', calendar: calendars.hebrew },
  { name: 'Buddhist', locale: 'th-TH', calendar: calendars.buddhist },
  { name: 'Islamic', locale: 'ar-SA', calendar: calendars['islamic-umalqura'] },
];

const defaultRangeSeparator = '\u00A0–\u00A0';

const getPlaceholder = (format: string, rangeSeparator = defaultRangeSeparator) => `${format}${rangeSeparator}${format}`;

const locales = ['en-US', 'de-DE', 'ja-JP', 'fr-FR'];
const sizes: DateRangeFieldProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const states = [
  { label: 'default', error: false, disabled: false },
  { label: 'error', error: true, disabled: false },
  { label: 'disabled', error: false, disabled: true },
];

const DateRangeFieldParts: FC<DateRangeFieldInputProps> = (props) => (
  <>
    <DateRangeFieldInput {...props} />
    <Popover placement='bottom-end'>
      <PopoverTrigger asChild>
        <DateRangeFieldTriggerIconButton aria-label='Open calendar' />
      </PopoverTrigger>
      <PopoverContent>
        <DateRangeFieldCalendar>
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
              <CalendarWeekdays format='narrow'>
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
  </>
);

const FormItem: FC<{ id: string; label: string; children: ReactNode }> = ({ id, label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 300 }}>
    <Label htmlFor={id}>{label}</Label>
    {children}
  </div>
);

const meta = {
  title: 'Form/Fields/DateRangeField',
  component: DateRangeField,
  subcomponents: {
    DateRangeFieldInput,
    DateRangeFieldCalendar,
    DateRangeFieldTriggerIconButton,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    format: { control: 'text' },
    separator: { control: 'text' },
    rangeSeparator: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' },
    locale: { control: 'text' },
    calendar: { control: 'select', options: Object.keys(calendars), mapping: calendars },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    format: getDateFormat(gregorianCalendar),
    separator: getDateSeparator(gregorianCalendar),
  },
  render: (args) => (
    <FormItem id='dates' label='Dates'>
      <DateRangeField {...args}>
        <DateRangeFieldParts id='dates' placeholder={getPlaceholder(args.format, args.rangeSeparator)} />
      </DateRangeField>
    </FormItem>
  ),
} satisfies Meta<typeof DateRangeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, 300px)`, gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => states.map((state) => (
        <DateRangeField key={`${size}-${state.label}`} {...args} size={size} error={state.error} disabled={state.disabled}>
          <DateRangeFieldParts aria-label={`${size} / ${state.label}`} placeholder={getPlaceholder(args.format, args.rangeSeparator)} />
        </DateRangeField>
      )))}
    </div>
  ),
};

export const Locales: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {locales.map((locale) => (
        <FormItem key={locale} id={locale} label={locale}>
          <DateRangeField {...args} locale={locale} format={getDateFormat(gregorianCalendar, locale)} separator={getDateSeparator(gregorianCalendar, locale)}>
            <DateRangeFieldParts id={locale} placeholder={getPlaceholder(getDateFormat(gregorianCalendar, locale), args.rangeSeparator)} />
          </DateRangeField>
        </FormItem>
      ))}
    </div>
  ),
};

export const CalendarSystems: Story = {
  name: 'Calendar systems',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {calendarSystems.map(({ name, locale, calendar }) => (
        <FormItem key={name} id={name} label={`${name} (${locale})`}>
          <DateRangeField {...args} locale={locale} calendar={calendar} format={getDateFormat(calendar, locale)} separator={getDateSeparator(calendar, locale)}>
            <DateRangeFieldParts id={name} placeholder={getPlaceholder(getDateFormat(calendar, locale), args.rangeSeparator)} />
          </DateRangeField>
        </FormItem>
      ))}
    </div>
  ),
};
