import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerRowGroup } from './YearPickerRowGroup.tsx';
import { YearPickerItem } from '../YearPickerItem';
import { YearPickerRow } from '../YearPickerRow';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof YearPickerRowGroup> = {
  title: 'Data/Pickers/YearPicker/CalendarYearPickerRowGroup',
  component: YearPickerRowGroup,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <YearPickerRow row={0}>
        <YearPickerItem col={0}>0</YearPickerItem>
        <YearPickerItem col={1}>1</YearPickerItem>
        <YearPickerItem col={2}>2</YearPickerItem>
      </YearPickerRow>,
      <YearPickerRow row={1}>
        <YearPickerItem col={0}>0</YearPickerItem>
        <YearPickerItem col={1}>1</YearPickerItem>
        <YearPickerItem col={2}>2</YearPickerItem>
      </YearPickerRow>
    ]
  },
};