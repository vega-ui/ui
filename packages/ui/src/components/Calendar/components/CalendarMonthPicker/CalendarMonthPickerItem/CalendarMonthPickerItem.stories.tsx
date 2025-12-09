import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarMonthPickerItem } from './CalendarMonthPickerItem'
import { formatMonth, getCurrentDate } from '@vega-ui/utils';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarMonthPickerItem> = {
  title: 'Data/Calendar/CalendarMonthPicker/CalendarMonthPickerItem',
  component: CalendarMonthPickerItem,
  args: {
    children: formatMonth(getCurrentDate().getMonth(), navigator.language, 'long'),
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};