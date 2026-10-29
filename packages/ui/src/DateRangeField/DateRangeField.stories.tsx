import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC, FormEvent, ReactNode, useState } from 'react';

import { DateRangeField } from './DateRangeField';
import { DateRangeFieldCalendar, DateRangeFieldInput, DateRangeFieldInputProps, DateRangeFieldTriggerIconButton } from './components';
import { formatISODate, getCurrentDate, getDateTemplate, getNextDate, parseISODate, parseTemplateDate } from '@vega-ui/utils';
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

const defaultRangeSeparator = '\u00A0–\u00A0';
const getPlaceholder = (format: string, rangeSeparator = defaultRangeSeparator) => `${format}${rangeSeparator}${format}`;

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

const FormItem: FC<{ id: string; label: string; hint?: ReactNode; children: ReactNode }> = ({ id, label, hint, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 300 }}>
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
const staySeparator = '.';
const stayTemplate = getDateTemplate(stayFormat, staySeparator);
const dayLength = 24 * 60 * 60 * 1000;

const parseStay = (text: string) => {
  const start = parseTemplateDate(gregorianCalendar, text.slice(0, stayTemplate.length), stayTemplate);
  const end = parseTemplateDate(gregorianCalendar, text.slice(stayTemplate.length + defaultRangeSeparator.length), stayTemplate);
  if (!start) return undefined;
  if (!end) return undefined;
  return { start, end, nights: (Date.parse(end) - Date.parse(start)) / dayLength };
};

const StaySummary: FC = () => {
  const [stay, setStay] = useState<ReturnType<typeof parseStay>>(undefined);

  const onInput = (event: FormEvent<HTMLInputElement>) => {
    setStay(parseStay(event.currentTarget.value));
  };

  const getSummary = () => {
    if (!stay) return 'Pick or type both dates';
    return `${stay.start} → ${stay.end}, ${stay.nights} nights`;
  };

  return (
    <FormItem id='stay-summary' label='Stay' hint={getSummary()}>
      <DateRangeField format={stayFormat} separator={staySeparator} min={shift(0)}>
        <DateRangeFieldParts id='stay-summary' placeholder={getPlaceholder(stayFormat)} onInput={onInput} />
      </DateRangeField>
    </FormItem>
  );
};

const meta = {
  title: 'Form/Fields/DateRangeField/DateRangeField',
  component: DateRangeField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: {
    format: getDateFormat(gregorianCalendar),
    separator: getDateSeparator(gregorianCalendar),
  },
  render: (props) => (
    <FormItem id='vacation' label='Vacation' hint='A range typed in reverse order is swapped'>
      <DateRangeField {...props}>
        <DateRangeFieldParts id='vacation' placeholder={getPlaceholder(props.format, props.rangeSeparator)} />
      </DateRangeField>
    </FormItem>
  ),
} satisfies Meta<typeof DateRangeField>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Pick the start and the end in the calendar, or type both; a range typed
 * in reverse is swapped.
 */
export const Default: Story = {
  args: {},
};

export const MinMax: Story = {
  name: 'Min and max',
  render: (props) => (
    <FormItem id='stay' label='Stay' hint='Bookable for the next 60 days'>
      <DateRangeField {...props} min={shift(0)} max={shift(60)}>
        <DateRangeFieldParts id='stay' placeholder={getPlaceholder(props.format, props.rangeSeparator)} />
      </DateRangeField>
    </FormItem>
  ),
};

export const DisabledDates: Story = {
  name: 'Disabled dates (weekends)',
  render: (props) => (
    <FormItem id='workdays' label='Business trip' hint='Weekdays only'>
      <DateRangeField {...props} disabledDates={isWeekend}>
        <DateRangeFieldParts id='workdays' placeholder={getPlaceholder(props.format, props.rangeSeparator)} />
      </DateRangeField>
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
        <DateRangeField key={size} {...props} size={size}>
          <DateRangeFieldParts placeholder={size} />
        </DateRangeField>
      ))}
    </div>
  ),
};

/**
 * Both dates use the segment order and separator from `format` and
 * `separator`; the calendar popup follows the `locale` prop (month names,
 * first day of the week).
 */
export const Locales: Story = {
  render: (props) => (
    <Grid>
      {['en-US', 'de-DE', 'ja-JP', 'fr-FR'].map((locale) => (
        <FormItem key={locale} id={locale} label={locale} hint={getDateFormat(gregorianCalendar, locale)}>
          <DateRangeField {...props} locale={locale} format={getDateFormat(gregorianCalendar, locale)} separator={getDateSeparator(gregorianCalendar, locale)}>
            <DateRangeFieldParts id={locale} placeholder={getPlaceholder(getDateFormat(gregorianCalendar, locale), props.rangeSeparator)} />
          </DateRangeField>
        </FormItem>
      ))}
    </Grid>
  ),
};

/**
 * Each date is typed and picked in the calendar system of the `calendar`
 * prop, while both values stay ISO days.
 */
export const CalendarSystems: Story = {
  name: 'Calendar systems',
  render: (props) => (
    <Grid>
      {calendarSystems.map(({ name, locale, calendar }) => (
        <FormItem key={name} id={name} label={name} hint={locale}>
          <DateRangeField {...props} locale={locale} calendar={calendar} format={getDateFormat(calendar, locale)} separator={getDateSeparator(calendar, locale)}>
            <DateRangeFieldParts id={name} placeholder={getPlaceholder(getDateFormat(calendar, locale), props.rangeSeparator)} />
          </DateRangeField>
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
            <DateRangeField {...props} locale={locale} format={getDateFormat(gregorianCalendar, locale)} separator={getDateSeparator(gregorianCalendar, locale)}>
              <DateRangeFieldParts id={`rtl-${locale}`} placeholder={getPlaceholder(getDateFormat(gregorianCalendar, locale), props.rangeSeparator)} />
            </DateRangeField>
          </FormItem>
        </div>
      ))}
    </Grid>
  ),
};

/**
 * Inside a native `<form>`: the input takes `name` and `required` like any
 * `<input>`, and submits the whole range as one typed string — both dates in
 * `format` joined by `rangeSeparator` (e.g. `02/15/2026 – 02/20/2026`), not
 * ISO days. `required` only checks that the input is not empty. Reset clears
 * the text natively.
 */
export const Form: Story = {
  render: (props) => (
    <SubmitForm>
      <FormItem id='vacation-form' label='Vacation'>
        <DateRangeField {...props}>
          <DateRangeFieldParts id='vacation-form' name='vacation' placeholder={getPlaceholder(props.format, props.rangeSeparator)} required />
        </DateRangeField>
      </FormItem>
    </SubmitForm>
  ),
};

/**
 * State derived from the field without a value API: the input's `onInput`
 * splits the typed or picked text at `rangeSeparator` and parses both halves
 * with `parseTemplateDate` to show the number of nights.
 */
export const Dependent: Story = {
  name: 'Dependent (nights count)',
  render: () => <StaySummary />,
};
