import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerRow } from './YearPickerRow';
import { YearPickerItem } from '../YearPickerItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof YearPickerRow> = {
  title: 'Data/Pickers/YearPicker/YearPickerRow',
  component: YearPickerRow,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <YearPickerItem col={0}>0</YearPickerItem>,
      <YearPickerItem col={1}>1</YearPickerItem>,
      <YearPickerItem col={2}>2</YearPickerItem>
    ]
  },
};