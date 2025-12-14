import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarYearPickerRowGroup } from './CalendarYearPickerRowGroup.tsx';
import { CalendarYearPickerItem } from '../CalendarYearPickerItem';
import { CalendarYearPickerRow } from '../CalendarYearPickerRow';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarYearPickerRowGroup> = {
  title: 'Data/Calendar/CalendarYearPicker/CalendarYearPickerRowGroup',
  component: CalendarYearPickerRowGroup,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: (
      <>
        <CalendarYearPickerRow row={0}>
          <CalendarYearPickerItem col={0}>1970</CalendarYearPickerItem>
          <CalendarYearPickerItem col={1}>1971</CalendarYearPickerItem>
          <CalendarYearPickerItem col={2}>1972</CalendarYearPickerItem>
        </CalendarYearPickerRow>
        <CalendarYearPickerRow row={1}>
          <CalendarYearPickerItem col={0}>1973</CalendarYearPickerItem>
          <CalendarYearPickerItem col={1}>1973</CalendarYearPickerItem>
          <CalendarYearPickerItem col={2}>1974</CalendarYearPickerItem>
        </CalendarYearPickerRow>
      </>
    )
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};