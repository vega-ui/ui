import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerRow } from './YearPickerRow';
import { YearPickerItem } from '../YearPickerItem';

const meta: Meta<typeof YearPickerRow> = {
  title: 'Data/YearPicker/YearPickerRow',
  component: YearPickerRow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <YearPickerItem key={0} col={0}>2024</YearPickerItem>,
      <YearPickerItem key={1} col={1}>2025</YearPickerItem>,
      <YearPickerItem key={2} col={2}>2026</YearPickerItem>,
    ],
  },
};
