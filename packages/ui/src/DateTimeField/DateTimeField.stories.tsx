import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC, ReactNode } from 'react';

import { DateTimeField, DateTimeFieldProps } from './DateTimeField';
import { DateTimeFieldCalendar, DateTimeFieldInput, DateTimeFieldInputProps, DateTimeFieldTriggerIconButton } from './components';
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
import { getTimeTemplate } from '@vega-ui/utils';
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

const getPlaceholder = (dateFormat: string, timeFormat = 'HH:mm', separator = ', ') => `${dateFormat}${separator}${getTimeTemplate(timeFormat)}`;

const locales = ['en-US', 'de-DE', 'ja-JP', 'fr-FR'];
const sizes: DateTimeFieldProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const states = [
  { label: 'default', error: false, disabled: false },
  { label: 'error', error: true, disabled: false },
  { label: 'disabled', error: false, disabled: true },
];

const DateTimeFieldParts: FC<DateTimeFieldInputProps> = (props) => (
  <>
    <DateTimeFieldInput {...props} />
    <Popover placement='bottom-end'>
      <PopoverTrigger asChild>
        <DateTimeFieldTriggerIconButton aria-label='Open calendar' />
      </PopoverTrigger>
      <PopoverContent>
        <DateTimeFieldCalendar>
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
        </DateTimeFieldCalendar>
      </PopoverContent>
    </Popover>
  </>
);

const FormItem: FC<{ id: string; label: string; children: ReactNode }> = ({ id, label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 280 }}>
    <Label htmlFor={id}>{label}</Label>
    {children}
  </div>
);

const meta = {
  title: 'Form/Fields/DateTimeField',
  component: DateTimeField,
  subcomponents: {
    DateTimeFieldInput,
    DateTimeFieldCalendar,
    DateTimeFieldTriggerIconButton,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    dateFormat: { control: 'text' },
    dateSeparator: { control: 'text' },
    timeFormat: { control: 'radio', options: ['HH:mm', 'HH:mm:ss'] },
    timeStep: { control: 'number' },
    separator: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' },
    locale: { control: 'text' },
    calendar: { control: 'select', options: Object.keys(calendars), mapping: calendars },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    dateFormat: getDateFormat(gregorianCalendar),
    dateSeparator: getDateSeparator(gregorianCalendar),
  },
  render: (args) => (
    <FormItem id='date-time' label='Date and time'>
      <DateTimeField {...args}>
        <DateTimeFieldParts id='date-time' placeholder={getPlaceholder(args.dateFormat, args.timeFormat, args.separator)} />
      </DateTimeField>
    </FormItem>
  ),
} satisfies Meta<typeof DateTimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, 280px)`, gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => states.map((state) => (
        <DateTimeField key={`${size}-${state.label}`} {...args} size={size} error={state.error} disabled={state.disabled}>
          <DateTimeFieldParts aria-label={`${size} / ${state.label}`} placeholder={getPlaceholder(args.dateFormat, args.timeFormat, args.separator)} />
        </DateTimeField>
      )))}
    </div>
  ),
};

export const Locales: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {locales.map((locale) => (
        <FormItem key={locale} id={locale} label={locale}>
          <DateTimeField {...args} locale={locale} dateFormat={getDateFormat(gregorianCalendar, locale)} dateSeparator={getDateSeparator(gregorianCalendar, locale)}>
            <DateTimeFieldParts id={locale} placeholder={getPlaceholder(getDateFormat(gregorianCalendar, locale), args.timeFormat, args.separator)} />
          </DateTimeField>
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
          <DateTimeField {...args} locale={locale} calendar={calendar} dateFormat={getDateFormat(calendar, locale)} dateSeparator={getDateSeparator(calendar, locale)}>
            <DateTimeFieldParts id={name} placeholder={getPlaceholder(getDateFormat(calendar, locale), args.timeFormat, args.separator)} />
          </DateTimeField>
        </FormItem>
      ))}
    </div>
  ),
};
