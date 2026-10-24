import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateRangeFieldCalendar } from './DateRangeFieldCalendar';
import { DateRangeField } from '../../DateRangeField';
import { DateRangeFieldInput } from '../DateRangeFieldInput';
import { DateRangeFieldTriggerIconButton } from '../DateRangeFieldTriggerIconButton';
import { Popover, PopoverContent, PopoverTrigger } from '../../../Popover';
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
} from '../../../Calendar';
import { getDateFormat, getDateSeparator, gregorianCalendar } from '@vega-ui/i18n';

const format = getDateFormat(gregorianCalendar);
const separator = getDateSeparator(gregorianCalendar);

/**
 * The calendar of the field, rendered in its popover the way the field
 * composes it: picking a day writes it to the field's input.
 */
const meta = {
  title: 'Form/Fields/DateRangeField/DateRangeFieldCalendar',
  component: DateRangeFieldCalendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    children: (
      <>
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
      </>
    ),
  },
  decorators(Story) {
    return (
      <DateRangeField format={format} separator={separator}>
        <DateRangeFieldInput aria-label='Date' />
        <Popover placement='bottom-end' defaultOpen>
          <PopoverTrigger asChild>
            <DateRangeFieldTriggerIconButton aria-label='Open calendar' />
          </PopoverTrigger>
          <PopoverContent>
            <Story />
          </PopoverContent>
        </Popover>
      </DateRangeField>
    );
  },
} satisfies Meta<typeof DateRangeFieldCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
