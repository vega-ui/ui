import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarPickerButtonGroup } from './CalendarPickerButtonGroup';
import { CalendarMonthPickerButton } from '../CalendarMonthPickerButton';
import { CalendarYearPickerButton } from '../CalendarYearPickerButton';
import { formatMonth, formatYear } from '@vega-ui/utils';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarPickerButtonGroup> = {
  title: 'Data/Calendar/CalendarPickerButtonGroup',
  component: CalendarPickerButtonGroup,
  args: {
    children: (
      <>
        <CalendarMonthPickerButton>{formatMonth(12)}</CalendarMonthPickerButton>
        <CalendarYearPickerButton>{formatYear(2025)}</CalendarYearPickerButton>
      </>
    )
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};