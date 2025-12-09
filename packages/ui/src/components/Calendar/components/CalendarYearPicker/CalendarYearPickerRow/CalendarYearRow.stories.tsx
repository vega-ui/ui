import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarYearPickerRow } from './CalendarYearPickerRow';
import { CalendarYearPickerItem } from '../CalendarYearPickerItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarYearPickerRow> = {
  title: 'Data/Calendar/CalendarYearPicker/CalendarYearPickerRow',
  component: CalendarYearPickerRow,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: (
      <>
        <CalendarYearPickerItem col={0}>1970</CalendarYearPickerItem>
        <CalendarYearPickerItem col={1}>1971</CalendarYearPickerItem>
        <CalendarYearPickerItem col={2}>1972</CalendarYearPickerItem>
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