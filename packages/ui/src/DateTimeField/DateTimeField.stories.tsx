import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateTimeField } from './DateTimeField';
import { DateTimeFieldCalendar, DateTimeFieldInput, DateTimeFieldTriggerIconButton } from './components';
import { MaskitoDateMode } from '@maskito/kit';
import { getCurrentDate, getDateFormat, getDateSeparator, getWeekDayNames } from '@vega-ui/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Icon } from '../Icon';
import {
  CalendarContent, CalendarDayPicker, CalendarDayPickerScroller, CalendarDayPickerScrollerContent,
  CalendarDayPickerScrollerLayout,
  CalendarHeader, CalendarMonthLabel, CalendarMonthPicker,
  CalendarMonthPickerButton, CalendarMonthPickerLayout,
  CalendarNextButton,
  CalendarNextYearGroupButton, CalendarPickerButtonGroup, CalendarPrevButton, CalendarPrevYearGroupButton,
  CalendarWeekLabel,
  CalendarWeekLabels,
  CalendarYearLabel, CalendarYearPicker,
  CalendarYearPickerButton, CalendarYearPickerScroller, CalendarYearPickerScrollerContent,
  CalendarYearPickerScrollerLayout
} from '../Calendar';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from '@vega-ui/icons';

const meta = {
  title: 'Form/Fields/DateTimeField/DateTimeField',
  component: DateTimeField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: {
    dateFormat: getDateFormat(navigator.language) as MaskitoDateMode,
    dateSeparator: getDateSeparator(navigator.language),
    children: [
      <DateTimeFieldInput key={0} />,
      <Popover key={1} placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateTimeFieldTriggerIconButton />
        </PopoverTrigger>
        <PopoverContent>
          <DateTimeFieldCalendar>
            <CalendarHeader>
              <CalendarPrevYearGroupButton>
                <Icon><ArrowLeft /></Icon>
              </CalendarPrevYearGroupButton>
              <CalendarPrevButton>
                <Icon><ChevronLeft /></Icon>
              </CalendarPrevButton>
              <CalendarPickerButtonGroup>
                <CalendarMonthPickerButton>
                  <CalendarMonthLabel />
                </CalendarMonthPickerButton>
                <CalendarYearPickerButton>
                  <CalendarYearLabel />
                </CalendarYearPickerButton>
              </CalendarPickerButtonGroup>
              <CalendarNextButton>
                <Icon><ChevronRight /></Icon>
              </CalendarNextButton>
              <CalendarNextYearGroupButton>
                <Icon><ArrowRight /></Icon>
              </CalendarNextYearGroupButton>
            </CalendarHeader>
            <CalendarContent>
              <CalendarDayPicker>
                <CalendarWeekLabels>
                  {getWeekDayNames(navigator.language, 'short').map((name) => (
                    <CalendarWeekLabel key={name}>{name}</CalendarWeekLabel>
                  ))}
                </CalendarWeekLabels>
                <CalendarDayPickerScroller>
                  <CalendarDayPickerScrollerContent>
                    <CalendarDayPickerScrollerLayout />
                  </CalendarDayPickerScrollerContent>
                </CalendarDayPickerScroller>
              </CalendarDayPicker>
              
              <CalendarMonthPicker>
                <CalendarMonthPickerLayout />
              </CalendarMonthPicker>
              
              <CalendarYearPicker>
                <CalendarYearPickerScroller>
                  <CalendarYearPickerScrollerContent>
                    <CalendarYearPickerScrollerLayout />
                  </CalendarYearPickerScrollerContent>
                </CalendarYearPickerScroller>
              </CalendarYearPicker>
            </CalendarContent>
          </DateTimeFieldCalendar>
        </PopoverContent>
      </Popover>
    ]
  },
} satisfies Meta<typeof DateTimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Min: Story = {
  name: 'Min 1/1/2020',
  args: {
    min: new Date(2020, 0, 1)
  },
};

export const MinTime: Story = {
  name: 'Min 1/1/2020 12:00',
  args: {
    min: new Date(2020, 0, 1, 12)
  },
};

export const Max: Story = {
  name: 'Max 1/1/2030',
  args: {
    max: new Date(2030, 0, 1)
  },
};

export const MaxTime: Story = {
  name: 'Max 1/1/2030 19:30',
  args: {
    max: new Date(2030, 0, 1, 19, 30)
  },
};

export const DisabledDates: Story = {
  args: {
    disabledDates: [
      new Date(getCurrentDate().getFullYear(), getCurrentDate().getMonth(), 1),
      new Date(getCurrentDate().getFullYear(), getCurrentDate().getMonth(), 2),
      new Date(getCurrentDate().getFullYear(), getCurrentDate().getMonth(), 3),
      new Date(getCurrentDate().getFullYear(), getCurrentDate().getMonth(), 4),
      new Date(getCurrentDate().getFullYear(), getCurrentDate().getMonth(), 5),
    ]
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};