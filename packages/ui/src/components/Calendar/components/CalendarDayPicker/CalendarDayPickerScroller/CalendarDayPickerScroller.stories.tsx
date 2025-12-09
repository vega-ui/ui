import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDayPickerScroller } from './CalendarDayPickerScroller';
import { CalendarDayPickerScrollerContent } from '../CalendarDayPickerScrollerContent';
import { CalendarDayPickerScrollerLayout } from '../CalendarDayPickerScrollerLayout';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarDayPickerScroller> = {
  title: 'Data/Calendar/CalendarDayPicker/CalendarDayPickerScroller',
  component: CalendarDayPickerScroller,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: (
      <CalendarDayPickerScrollerContent>
        <CalendarDayPickerScrollerLayout />
      </CalendarDayPickerScrollerContent>
    )
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};