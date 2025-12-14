import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarYearPickerScroller } from './CalendarYearPickerScroller.tsx';
import { CalendarYearPickerScrollerContent } from '../CalendarYearPickerScrollerContent';
import { CalendarYearPickerScrollerLayout } from '../CalendarYearPickerScrollerLayout';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarYearPickerScroller> = {
  title: 'Data/Calendar/CalendarYearPicker/CalendarYearPickerScroller',
  component: CalendarYearPickerScroller,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: (
      <CalendarYearPickerScrollerContent>
        <CalendarYearPickerScrollerLayout />
      </CalendarYearPickerScrollerContent>
    )
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};