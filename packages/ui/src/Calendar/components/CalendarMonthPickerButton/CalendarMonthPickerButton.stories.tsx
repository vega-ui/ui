import type { Meta, StoryObj } from '@storybook/react-vite';
import { formatMonth, getCurrentDate } from '@vega-ui/utils';
import { CalendarMonthPickerButton } from './CalendarMonthPickerButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarMonthPickerButton> = {
  title: 'Data/Calendar/CalendarMonthPickerButton',
  component: CalendarMonthPickerButton,
  args: {
    children: formatMonth(getCurrentDate().getMonth())
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};