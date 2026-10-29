import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPickerRow } from './DayPickerRow';
import { DayPickerItem } from '../DayPickerItem';

const meta: Meta<typeof DayPickerRow> = {
  title: 'Data/DayPicker/DayPickerRow',
  component: DayPickerRow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <DayPickerItem key={0} col={0}>1</DayPickerItem>,
      <DayPickerItem key={1} col={1}>2</DayPickerItem>,
      <DayPickerItem key={2} col={2}>3</DayPickerItem>,
      <DayPickerItem key={3} col={3}>4</DayPickerItem>,
      <DayPickerItem key={4} col={4}>5</DayPickerItem>,
      <DayPickerItem key={5} col={5}>6</DayPickerItem>,
      <DayPickerItem key={6} col={6}>7</DayPickerItem>,
    ],
  },
};
