import type { Meta, StoryObj } from '@storybook/react-vite';
import { MonthPickerRow } from './MonthPickerRow';
import { MonthPickerItem } from '../MonthPickerItem';

const meta: Meta<typeof MonthPickerRow> = {
  title: 'Data/MonthPicker/MonthPickerRow',
  component: MonthPickerRow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <MonthPickerItem col={0}>Jan</MonthPickerItem>,
      <MonthPickerItem col={1}>Feb</MonthPickerItem>,
      <MonthPickerItem col={2}>Mar</MonthPickerItem>,
    ],
  },
};
