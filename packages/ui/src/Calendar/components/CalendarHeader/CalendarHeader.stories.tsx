import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarHeader } from './CalendarHeader.tsx';
import { CalendarPrevButton } from '../CalendarPrevButton';
import { Icon } from '../../../Icon';
import { CalendarPickerButtonGroup } from '../CalendarPickerButtonGroup';
import { CalendarMonthPickerButton } from '../CalendarMonthPickerButton';
import { CalendarYearPickerButton } from '../CalendarYearPickerButton';
import { CalendarNextButton } from '../CalendarNextButton';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { formatMonth, formatYear } from '@vega-ui/utils';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarHeader> = {
  title: 'Data/Calendar/CalendarHeader',
  component: CalendarHeader,
  args: {
    children: (
      <>
        <CalendarPrevButton>
          <Icon><ChevronLeft /></Icon>
        </CalendarPrevButton>
        <CalendarPickerButtonGroup>
          <CalendarMonthPickerButton>
            {formatMonth(1)}
          </CalendarMonthPickerButton>
          <CalendarYearPickerButton>
            {formatYear(2026)}
          </CalendarYearPickerButton>
        </CalendarPickerButtonGroup>
        <CalendarNextButton>
          <Icon><ChevronRight /></Icon>
        </CalendarNextButton>
      </>
    )
  },
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};