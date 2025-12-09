import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarMonthPickerRow } from './CalendarMonthPickerRow'
import { CalendarMonthPickerItem } from '../CalendarMonthPickerItem';
import { formatMonth } from '@vega-ui/utils';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarMonthPickerRow> = {
  title: 'Data/Calendar/CalendarMonthPicker/CalendarMonthPickerRow',
  component: CalendarMonthPickerRow,
  args: {
    children: (
      <>
        <CalendarMonthPickerItem col={0}>{formatMonth(12)}</CalendarMonthPickerItem>
        <CalendarMonthPickerItem col={1}>{formatMonth(1)}</CalendarMonthPickerItem>
        <CalendarMonthPickerItem col={2}>{formatMonth(2)}</CalendarMonthPickerItem>
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