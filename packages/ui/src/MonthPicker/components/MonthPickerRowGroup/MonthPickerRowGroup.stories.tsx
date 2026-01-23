import type { Meta, StoryObj } from '@storybook/react-vite';
import { MonthPickerRowGroup } from './MonthPickerRowGroup';
import { MonthPickerItem } from '../MonthPickerItem';
import { MonthPickerRow } from '../MonthPickerRow';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof MonthPickerRowGroup> = {
  title: 'Data/MonthPicker/MonthPickerRowGroup',
  component: MonthPickerRowGroup,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <MonthPickerRow row={0}>
        <MonthPickerItem col={0}>Jan</MonthPickerItem>
        <MonthPickerItem col={1}>Feb</MonthPickerItem>
        <MonthPickerItem col={2}>Mar</MonthPickerItem>
      </MonthPickerRow>,
      <MonthPickerRow row={1}>
        <MonthPickerItem col={0}>Apr</MonthPickerItem>
        <MonthPickerItem col={1}>May</MonthPickerItem>
        <MonthPickerItem col={2}>Jun</MonthPickerItem>
      </MonthPickerRow>
    ]
  },
};