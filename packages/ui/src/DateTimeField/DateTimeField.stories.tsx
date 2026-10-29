import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC, FormEvent, ReactNode, useState } from 'react';

import { DateTimeField } from './DateTimeField';
import { DateTimeFieldCalendar, DateTimeFieldInput, DateTimeFieldInputProps, DateTimeFieldTriggerIconButton } from './components';
import { formatISODate, getCurrentDate, getDateTimeTemplate, getNextDate, getTimeTemplate, parseISODate, parseTemplateDate } from '@vega-ui/utils';
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
  CalendarWeekdays,
  CalendarWeekday,
  CalendarDay,
  CalendarWeeks,
  CalendarYearLabel,
  CalendarYear,
  CalendarYears,
} from '../Calendar';
import { gregorianCalendar, createCalendarSystem, getDateFormat, getDateSeparator } from '@vega-ui/i18n';

const calendarSystems = [
  { name: 'Gregorian', locale: 'en-US', calendar: gregorianCalendar },
  { name: 'Persian', locale: 'fa-IR', calendar: createCalendarSystem('persian') },
  { name: 'Hebrew', locale: 'he-IL', calendar: createCalendarSystem('hebrew') },
  { name: 'Buddhist', locale: 'th-TH', calendar: createCalendarSystem('buddhist') },
  { name: 'Islamic', locale: 'ar-SA', calendar: createCalendarSystem('islamic-umalqura') },
];

const shift = (days: number) => formatISODate(getNextDate(getCurrentDate(), days));
const isWeekend = (date: string) => [0, 6].includes(parseISODate(date)?.getDay() ?? -1);

const getPlaceholder = (dateFormat: string, timeFormat = 'HH:mm', separator = ', ') => `${dateFormat}${separator}${getTimeTemplate(timeFormat)}`;

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

const FormItem: FC<{ id: string; label: string; hint?: ReactNode; children: ReactNode }> = ({ id, label, hint, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 280 }}>
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

const meetingDateFormat = 'DD.MM.YYYY';
const meetingDateSeparator = '.';
const meetingTemplate = getDateTimeTemplate({ dateFormat: meetingDateFormat, dateSeparator: meetingDateSeparator, separator: ', ', timeFormat: 'HH:mm' });

const MeetingTime: FC = () => {
  const [start, setStart] = useState<string | undefined>(undefined);

  const onStartInput = (event: FormEvent<HTMLInputElement>) => {
    setStart(parseTemplateDate(gregorianCalendar, event.currentTarget.value, meetingTemplate));
  };

  const getEndHint = () => {
    if (!start) return 'Any time';
    return `From ${start}`;
  };

  return (
    <Grid>
      <FormItem id='meeting-start' label='Start' hint={start ?? 'Not set yet'}>
        <DateTimeField dateFormat={meetingDateFormat} dateSeparator={meetingDateSeparator}>
          <DateTimeFieldParts id='meeting-start' placeholder={getPlaceholder(meetingDateFormat)} onInput={onStartInput} />
        </DateTimeField>
      </FormItem>
      <FormItem id='meeting-end' label='End' hint={getEndHint()}>
        <DateTimeField dateFormat={meetingDateFormat} dateSeparator={meetingDateSeparator} min={start}>
          <DateTimeFieldParts id='meeting-end' placeholder={getPlaceholder(meetingDateFormat)} />
        </DateTimeField>
      </FormItem>
    </Grid>
  );
};

const meta = {
  title: 'Form/Fields/DateTimeField/DateTimeField',
  component: DateTimeField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    timeFormat: { control: 'radio', options: ['HH:mm', 'HH:mm:ss'] },
  },
  args: {
    dateFormat: getDateFormat(gregorianCalendar),
    dateSeparator: getDateSeparator(gregorianCalendar),
  },
  render: (props) => (
    <FormItem id='departure' label='Departure' hint={`${getPlaceholder(props.dateFormat, props.timeFormat, props.separator)} — local time`}>
      <DateTimeField {...props}>
        <DateTimeFieldParts id='departure' placeholder={getPlaceholder(props.dateFormat, props.timeFormat, props.separator)} />
      </DateTimeField>
    </FormItem>
  ),
} satisfies Meta<typeof DateTimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSeconds: Story = {
  name: 'With seconds',
  args: {
    timeFormat: 'HH:mm:ss',
  },
};

/**
 * With the caret in the hours, minutes or seconds, ArrowUp / ArrowDown change
 * that segment by `timeStep`.
 */
export const TimeStep: Story = {
  name: 'Time step',
  render: (props) => (
    <FormItem id='slot' label='Appointment' hint='Put the caret in the minutes and press ↑ / ↓ to move by 15 minutes'>
      <DateTimeField {...props} timeStep={15}>
        <DateTimeFieldParts id='slot' placeholder={getPlaceholder(props.dateFormat, props.timeFormat, props.separator)} />
      </DateTimeField>
    </FormItem>
  ),
};

/**
 * `min` and `max` include the time: a typed value outside them is clamped,
 * so on the first day nothing earlier than 09:00 can be entered.
 */
export const MinMax: Story = {
  name: 'Min and max',
  render: (props) => (
    <FormItem id='pickup' label='Pickup' hint={`From ${shift(1)} 09:00 to ${shift(14)} 18:00`}>
      <DateTimeField {...props} min={`${shift(1)}T09:00`} max={`${shift(14)}T18:00`}>
        <DateTimeFieldParts id='pickup' placeholder={getPlaceholder(props.dateFormat, props.timeFormat, props.separator)} />
      </DateTimeField>
    </FormItem>
  ),
};

export const DisabledDates: Story = {
  name: 'Disabled dates (weekends)',
  render: (props) => (
    <FormItem id='meeting' label='Meeting' hint='Weekdays only'>
      <DateTimeField {...props} disabledDates={isWeekend}>
        <DateTimeFieldParts id='meeting' placeholder={getPlaceholder(props.dateFormat, props.timeFormat, props.separator)} />
      </DateTimeField>
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
        <DateTimeField key={size} {...props} size={size}>
          <DateTimeFieldParts placeholder={size} />
        </DateTimeField>
      ))}
    </div>
  ),
};

/**
 * The date segment order and separator come from `dateFormat` and
 * `dateSeparator`, the time segments from `timeFormat`. The calendar popup
 * follows the `locale` prop (month names, first day of the week).
 */
export const Locales: Story = {
  render: (props) => (
    <Grid>
      {['en-US', 'de-DE', 'ja-JP', 'fr-FR'].map((locale) => (
        <FormItem key={locale} id={locale} label={locale} hint={getPlaceholder(getDateFormat(gregorianCalendar, locale), props.timeFormat, props.separator)}>
          <DateTimeField {...props} locale={locale} dateFormat={getDateFormat(gregorianCalendar, locale)} dateSeparator={getDateSeparator(gregorianCalendar, locale)}>
            <DateTimeFieldParts id={locale} placeholder={getPlaceholder(getDateFormat(gregorianCalendar, locale), props.timeFormat, props.separator)} />
          </DateTimeField>
        </FormItem>
      ))}
    </Grid>
  ),
};

/**
 * The date part is typed and picked in the calendar system of the
 * `calendar` prop; the time part is the same in every calendar.
 */
export const CalendarSystems: Story = {
  name: 'Calendar systems',
  render: (props) => (
    <Grid>
      {calendarSystems.map(({ name, locale, calendar }) => (
        <FormItem key={name} id={name} label={name} hint={locale}>
          <DateTimeField {...props} locale={locale} calendar={calendar} dateFormat={getDateFormat(calendar, locale)} dateSeparator={getDateSeparator(calendar, locale)}>
            <DateTimeFieldParts id={name} placeholder={getPlaceholder(getDateFormat(calendar, locale), props.timeFormat, props.separator)} />
          </DateTimeField>
        </FormItem>
      ))}
    </Grid>
  ),
};

/**
 * The field follows the text direction it is rendered in, like native
 * inputs: here `dir="rtl"` on a wrapper. The calendar button moves to the
 * left, and the weeks of the calendar run from right to left. Direction is
 * never taken from `locale`.
 */
export const RightToLeft: Story = {
  name: 'Right to left',
  render: (props) => (
    <Grid>
      {['ar-EG', 'he-IL'].map((locale) => (
        <div key={locale} dir='rtl'>
          <FormItem id={`rtl-${locale}`} label={locale} hint={getDateFormat(gregorianCalendar, locale)}>
            <DateTimeField {...props} locale={locale} dateFormat={getDateFormat(gregorianCalendar, locale)} dateSeparator={getDateSeparator(gregorianCalendar, locale)}>
              <DateTimeFieldParts id={`rtl-${locale}`} placeholder={getPlaceholder(getDateFormat(gregorianCalendar, locale), props.timeFormat, props.separator)} />
            </DateTimeField>
          </FormItem>
        </div>
      ))}
    </Grid>
  ),
};

/**
 * Inside a native `<form>`: the input takes `name` and `required` like any
 * `<input>`, and submits the text as typed — date in `dateFormat`, then
 * `separator`, then time (e.g. `02/15/2026, 09:30`), not an ISO date-time.
 * `required` only checks that the input is not empty. Reset clears the text
 * natively.
 */
export const Form: Story = {
  render: (props) => (
    <SubmitForm>
      <FormItem id='departure-form' label='Departure'>
        <DateTimeField {...props}>
          <DateTimeFieldParts id='departure-form' name='departure' placeholder={getPlaceholder(props.dateFormat, props.timeFormat, props.separator)} required />
        </DateTimeField>
      </FormItem>
    </SubmitForm>
  ),
};

/**
 * Two fields that depend on each other without a value API: the start
 * input's `onInput` parses the typed or picked text with
 * `parseTemplateDate`, and the end `min` follows it — an end typed before
 * the start is clamped to it, also when the start changes later.
 */
export const Dependent: Story = {
  name: 'Dependent (meeting end follows the start)',
  render: () => <MeetingTime />,
};
