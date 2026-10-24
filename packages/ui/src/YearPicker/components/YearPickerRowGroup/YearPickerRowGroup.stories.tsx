import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerRowGroup } from './YearPickerRowGroup';
import { YearPickerItem } from '../YearPickerItem';
import { YearPickerRow } from '../YearPickerRow';

const meta: Meta<typeof YearPickerRowGroup> = {
  title: 'Data/YearPicker/YearPickerRowGroup',
  component: YearPickerRowGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <YearPickerRow row={0}>
        <YearPickerItem col={0}>2024</YearPickerItem>
        <YearPickerItem col={1}>2025</YearPickerItem>
        <YearPickerItem col={2}>2026</YearPickerItem>
      </YearPickerRow>,
      <YearPickerRow row={1}>
        <YearPickerItem col={0}>2027</YearPickerItem>
        <YearPickerItem col={1}>2028</YearPickerItem>
        <YearPickerItem col={2}>2029</YearPickerItem>
      </YearPickerRow>,
    ],
  },
};
