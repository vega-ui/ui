import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDayPickerRow } from './CalendarDayPickerRow.tsx';
import { CalendarDayPickerItem } from '../CalendarDayPickerItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarDayPickerRow> = {
  title: 'Data/Calendar/CalendarDayPicker/CalendarDayPickerRow',
  component: CalendarDayPickerRow,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: (
      <>
        <CalendarDayPickerItem col={0}>1</CalendarDayPickerItem>
        <CalendarDayPickerItem col={1}>2</CalendarDayPickerItem>
        <CalendarDayPickerItem col={2}>3</CalendarDayPickerItem>
        <CalendarDayPickerItem col={3}>4</CalendarDayPickerItem>
        <CalendarDayPickerItem col={4}>5</CalendarDayPickerItem>
        <CalendarDayPickerItem col={5}>6</CalendarDayPickerItem>
        <CalendarDayPickerItem col={6}>7</CalendarDayPickerItem>
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