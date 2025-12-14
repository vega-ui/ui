import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarMonthPickerRowGroup } from './CalendarMonthPickerRowGroup.tsx'
import { CalendarMonthPickerItem } from '../CalendarMonthPickerItem';
import { formatMonth } from '@vega-ui/utils';
import { CalendarMonthPickerRow } from '../CalendarMonthPickerRow';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarMonthPickerRowGroup> = {
  title: 'Data/Calendar/CalendarMonthPicker/CalendarMonthPickerRowGroup',
  component: CalendarMonthPickerRowGroup,
  args: {
    children: (
      <>
        <CalendarMonthPickerRow row={0}>
          <CalendarMonthPickerItem col={0}>{formatMonth(11)}</CalendarMonthPickerItem>
          <CalendarMonthPickerItem col={1}>{formatMonth(0)}</CalendarMonthPickerItem>
          <CalendarMonthPickerItem col={2}>{formatMonth(1)}</CalendarMonthPickerItem>
        </CalendarMonthPickerRow>
        <CalendarMonthPickerRow row={1}>
          <CalendarMonthPickerItem col={0}>{formatMonth(2)}</CalendarMonthPickerItem>
          <CalendarMonthPickerItem col={1}>{formatMonth(3)}</CalendarMonthPickerItem>
          <CalendarMonthPickerItem col={2}>{formatMonth(4)}</CalendarMonthPickerItem>
        </CalendarMonthPickerRow>
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