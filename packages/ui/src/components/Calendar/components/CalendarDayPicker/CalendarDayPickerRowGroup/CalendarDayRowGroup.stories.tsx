import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDayPickerRowGroup } from './CalendarDayPickerRowGroup';
import { CalendarDayPickerItem } from '../CalendarDayPickerItem';
import { CalendarDayPickerRow } from '../CalendarDayPickerRow';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarDayPickerRowGroup> = {
  title: 'Data/Calendar/CalendarDayPicker/CalendarDayPickerRowGroup',
  component: CalendarDayPickerRowGroup,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: (
      <>
        <CalendarDayPickerRow row={0}>
          <CalendarDayPickerItem col={0}>1</CalendarDayPickerItem>
          <CalendarDayPickerItem col={1}>2</CalendarDayPickerItem>
          <CalendarDayPickerItem col={2}>3</CalendarDayPickerItem>
          <CalendarDayPickerItem col={3}>4</CalendarDayPickerItem>
          <CalendarDayPickerItem col={4}>5</CalendarDayPickerItem>
          <CalendarDayPickerItem col={5}>6</CalendarDayPickerItem>
          <CalendarDayPickerItem col={6}>7</CalendarDayPickerItem>
        </CalendarDayPickerRow>
        <CalendarDayPickerRow row={1}>
          <CalendarDayPickerItem col={0}>1</CalendarDayPickerItem>
          <CalendarDayPickerItem col={1}>2</CalendarDayPickerItem>
          <CalendarDayPickerItem col={2}>3</CalendarDayPickerItem>
          <CalendarDayPickerItem col={3}>4</CalendarDayPickerItem>
          <CalendarDayPickerItem col={4}>5</CalendarDayPickerItem>
          <CalendarDayPickerItem col={5}>6</CalendarDayPickerItem>
          <CalendarDayPickerItem col={6}>7</CalendarDayPickerItem>
        </CalendarDayPickerRow>
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