import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarYearPickerScroller } from '../CalendarYearPickerScroller';
import { CalendarYearPickerScrollerContent } from '../CalendarYearPickerScrollerContent';
import { CalendarYearPickerScrollerLayout } from '../CalendarYearPickerScrollerLayout';
import { CalendarYearPicker } from './CalendarYearPicker.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarYearPicker> = {
  title: 'Data/Calendar/CalendarYearPicker/CalendarYearPicker',
  component: CalendarYearPicker,
  args: {
    children: (
      <>
        <CalendarYearPickerScroller>
          <CalendarYearPickerScrollerContent>
            <CalendarYearPickerScrollerLayout />
          </CalendarYearPickerScrollerContent>
        </CalendarYearPickerScroller>
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