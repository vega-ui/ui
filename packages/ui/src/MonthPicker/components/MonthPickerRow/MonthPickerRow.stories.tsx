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
      <MonthPickerItem key={0} col={0}>Jan</MonthPickerItem>,
      <MonthPickerItem key={1} col={1}>Feb</MonthPickerItem>,
      <MonthPickerItem key={2} col={2}>Mar</MonthPickerItem>,
    ],
  },
};
