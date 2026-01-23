import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPickerRow } from './DayPickerRow';
import { DayPickerItem } from '../DayPickerItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DayPickerRow> = {
  title: 'Data/DayPicker/DayPickerRow',
  component: DayPickerRow,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <DayPickerItem col={0}>1</DayPickerItem>,
      <DayPickerItem col={1}>2</DayPickerItem>,
      <DayPickerItem col={2}>3</DayPickerItem>,
      <DayPickerItem col={3}>4</DayPickerItem>,
      <DayPickerItem col={4}>5</DayPickerItem>,
      <DayPickerItem col={5}>6</DayPickerItem>,
      <DayPickerItem col={6}>7</DayPickerItem>
    ]
  },
};