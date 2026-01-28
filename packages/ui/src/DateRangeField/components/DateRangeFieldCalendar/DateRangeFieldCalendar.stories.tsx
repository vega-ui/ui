import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateRangeFieldCalendar } from './DateRangeFieldCalendar';
import { getWeekDayNames } from '@vega-ui/utils';
import {
  CalendarContent, CalendarDayPicker, CalendarDayPickerScroller, CalendarDayPickerScrollerContent,
  CalendarDayPickerScrollerLayout,
  CalendarHeader, CalendarMonthLabel,
  CalendarMonthPicker, CalendarMonthPickerButton,
  CalendarMonthPickerLayout, CalendarNextButton, CalendarNextYearGroupButton,
  CalendarPickerButtonGroup,
  CalendarPrevButton,
  CalendarPrevYearGroupButton, CalendarWeekLabel, CalendarWeekLabels, CalendarYearLabel,
  CalendarYearPicker, CalendarYearPickerButton, CalendarYearPickerScroller, CalendarYearPickerScrollerContent,
  CalendarYearPickerScrollerLayout
} from '../../../Calendar';
import { Icon } from '../../../Icon';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from '@vega-ui/icons';

const meta = {
  title: 'Form/Fields/DateRangeField/DateRangeFieldCalendar',
  component: DateRangeFieldCalendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    children: [
      <CalendarHeader key={0}>
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
      </CalendarHeader>,
      <CalendarContent key={1}>
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
          <CalendarMonthPickerLayout  />
        </CalendarMonthPicker>
        <CalendarYearPicker>
          <CalendarYearPickerScroller>
            <CalendarYearPickerScrollerContent>
              <CalendarYearPickerScrollerLayout />
            </CalendarYearPickerScrollerContent>
          </CalendarYearPickerScroller>
        </CalendarYearPicker>
      </CalendarContent>
    ]
  }
} satisfies Meta<typeof DateRangeFieldCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
