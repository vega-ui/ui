import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC, FormEvent, ReactNode, useState } from 'react';

import { DateField } from './DateField';
import { DateFieldCalendar, DateFieldInput, DateFieldInputProps, DateFieldTriggerIconButton } from './components';
import { formatISODate, getCurrentDate, getNextDate, parseISODate, parseTemplateDate } from '@vega-ui/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Label } from '../Label';
import { HelperText } from '../HelperText';
import { Button } from '../Button';
import { Code } from '../Code';
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
  CalendarWeekdays, CalendarWeekday,
  CalendarDay,
  CalendarWeeks,
  CalendarYearLabel,
  CalendarYear,
  CalendarYears,
} from '../Calendar';
import { gregorianCalendar, createCalendarSystem, getDateFormat, getDateSeparator } from '@vega-ui/i18n';

const calendarSystems = [
  { name: 'Gregorian', locale: 'en-US', calendar: gregorianCalendar, format: 'MM/DD/YYYY', separator: '/' },
  { name: 'Persian', locale: 'fa-IR', calendar: createCalendarSystem('persian'), format: 'YYYY/MM/DD', separator: '/' },
  { name: 'Hebrew', locale: 'he-IL', calendar: createCalendarSystem('hebrew'), format: 'DD.MM.YYYY', separator: '.' },
  { name: 'Buddhist', locale: 'th-TH', calendar: createCalendarSystem('buddhist'), format: 'DD/MM/YYYY', separator: '/' },
  { name: 'Islamic', locale: 'ar-SA', calendar: createCalendarSystem('islamic-umalqura'), format: 'DD/MM/YYYY', separator: '/' },
];

const shift = (days: number) => formatISODate(getNextDate(getCurrentDate(), days));
const isWeekend = (date: string) => [0, 6].includes(parseISODate(date)?.getDay() ?? -1);

const DateFieldParts: FC<DateFieldInputProps> = (props) => (
  <>
    <DateFieldInput {...props} />
    <Popover placement='bottom-end'>
      <PopoverTrigger asChild>
        <DateFieldTriggerIconButton aria-label='Open calendar' />
      </PopoverTrigger>
      <PopoverContent>
        <DateFieldCalendar>
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
        </DateFieldCalendar>
      </PopoverContent>
    </Popover>
  </>
);

const FormItem: FC<{ id: string; label: string; hint?: ReactNode; children: ReactNode }> = ({ id, label, hint, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 260 }}>
    <Label htmlFor={id}>{label}</Label>
    {children}
    {hint && <HelperText>{hint}</HelperText>}
  </div>
);

const Grid: FC<{ children: ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>{children}</div>
);

const SubmitForm: FC<{ children: ReactNode }> = ({ children }) => {
  const [payload, setPayload] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const entries = Object.fromEntries(new FormData(event.currentTarget));
    setPayload(JSON.stringify(entries, null, 2));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <form onSubmit={onSubmit} onReset={() => setPayload('')} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {children}
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type='submit'>Submit</Button>
          <Button type='reset' variant='secondary'>Reset</Button>
        </div>
      </form>
      {payload && (
        <Code>
          <pre style={{ margin: 0 }}>{payload}</pre>
        </Code>
      )}
    </div>
  );
};

const stayFormat = 'DD.MM.YYYY';
const stayTemplate = 'dd.mm.yyyy';

const getDayAfter = (date?: string) => {
  const parsed = parseISODate(date);
  if (!parsed) return shift(1);
  return formatISODate(getNextDate(parsed, 1));
};

const StayDates: FC = () => {
  const [checkIn, setCheckIn] = useState<string | undefined>(undefined);

  const onCheckInInput = (event: FormEvent<HTMLInputElement>) => {
    setCheckIn(parseTemplateDate(gregorianCalendar, event.currentTarget.value, stayTemplate));
  };

  return (
    <Grid>
      <FormItem id='check-in' label='Check-in' hint={checkIn ?? 'Not set yet'}>
        <DateField format={stayFormat} separator='.' min={shift(0)}>
          <DateFieldParts id='check-in' placeholder={stayFormat} onInput={onCheckInInput} />
        </DateField>
      </FormItem>
      <FormItem id='check-out' label='Check-out' hint={`From ${getDayAfter(checkIn)}`}>
        <DateField format={stayFormat} separator='.' min={getDayAfter(checkIn)}>
          <DateFieldParts id='check-out' placeholder={stayFormat} />
        </DateField>
      </FormItem>
    </Grid>
  );
};

const format = getDateFormat(gregorianCalendar, navigator.language);

const meta = {
  title: 'Form/Fields/DateField/DateField',
  component: DateField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: {
    format,
    separator: getDateSeparator(gregorianCalendar, navigator.language),
    children: <DateFieldParts placeholder={format} />,
  },
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  render: (props) => (
    <FormItem id='birthday' label='Date of birth' hint={`Type it as ${format} or pick it in the calendar`}>
      <DateField {...props}>
        <DateFieldParts id='birthday' placeholder={format} />
      </DateField>
    </FormItem>
  ),
};

export const MinMax: Story = {
  name: 'Min and max',
  render: (props) => (
    <FormItem id='delivery' label='Delivery date' hint='Within the next 30 days'>
      <DateField {...props} min={shift(1)} max={shift(30)}>
        <DateFieldParts id='delivery' placeholder={format} />
      </DateField>
    </FormItem>
  ),
};

export const DisabledDates: Story = {
  name: 'Disabled dates (weekends)',
  render: (props) => (
    <FormItem id='meeting' label='Meeting day' hint='Weekdays only'>
      <DateField {...props} disabledDates={isWeekend}>
        <DateFieldParts id='meeting' placeholder={format} />
      </DateField>
    </FormItem>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Sizes from `xs` to `xl`, set with the `size` prop of the field.
 */
export const Sizes: Story = {
  render: (props) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <DateField key={size} {...props} size={size}>
          <DateFieldParts placeholder={size} />
        </DateField>
      ))}
    </div>
  ),
};

/**
 * The segment order and separator come from `format` and `separator`; the
 * calendar popup follows the `locale` prop (month names, first day of the
 * week) — no provider needed.
 */
export const Locales: Story = {
  render: (props) => (
    <Grid>
      {['en-US', 'de-DE', 'ja-JP', 'fr-FR'].map((locale) => (
        <FormItem key={locale} id={locale} label={locale} hint={getDateFormat(gregorianCalendar, locale)}>
          <DateField {...props} locale={locale} format={getDateFormat(gregorianCalendar, locale)} separator={getDateSeparator(gregorianCalendar, locale)}>
            <DateFieldParts id={locale} placeholder={getDateFormat(gregorianCalendar, locale)} />
          </DateField>
        </FormItem>
      ))}
    </Grid>
  ),
};

/**
 * Dates are typed and picked in the calendar system of the `calendar`
 * prop: typing `31` in the sixth Persian month or `13` as a
 * Hebrew leap month is valid, while the value stays an ISO day.
 */
export const CalendarSystems: Story = {
  render: (props) => (
    <Grid>
      {calendarSystems.map(({ name, locale, calendar, format, separator }) => (
        <FormItem key={name} id={name} label={name} hint={locale}>
          <DateField {...props} locale={locale} calendar={calendar} format={format} separator={separator}>
            <DateFieldParts id={name} placeholder={format} />
          </DateField>
        </FormItem>
      ))}
    </Grid>
  ),
};

/**
 * Inside a native `<form>`: the input takes `name` and `required` like any
 * `<input>`, and submits the text as typed in `format` (e.g. `02/15/2026`),
 * not an ISO day. `required` only checks that the input is not empty. Reset
 * clears the text natively.
 */
export const Form: Story = {
  render: (props) => (
    <SubmitForm>
      <FormItem id='birthday-form' label='Date of birth'>
        <DateField {...props}>
          <DateFieldParts id='birthday-form' name='birthday' placeholder={format} required />
        </DateField>
      </FormItem>
    </SubmitForm>
  ),
};

/**
 * Two fields that depend on each other without a value API: the check-in
 * input's `onInput` parses the typed or picked text with
 * `parseTemplateDate`, and the check-out `min` follows it — the
 * check-out calendar starts the day after check-in.
 */
export const Dependent: Story = {
  name: 'Dependent (check-in and check-out)',
  render: () => <StayDates />,
};
