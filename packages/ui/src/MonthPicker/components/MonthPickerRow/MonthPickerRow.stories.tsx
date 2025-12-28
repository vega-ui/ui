import type { Meta, StoryObj } from '@storybook/react-vite';
import { MonthPickerRow } from './MonthPickerRow';
import { MonthPickerItem } from '../MonthPickerItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof MonthPickerRow> = {
  title: 'Data/Pickers/MonthPicker/MonthPickerRow',
  component: MonthPickerRow,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <MonthPickerItem col={0}>Jan</MonthPickerItem>,
      <MonthPickerItem col={1}>Feb</MonthPickerItem>,
      <MonthPickerItem col={2}>Mar</MonthPickerItem>
    ]
  },
};