import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarYearPickerScrollerContent } from './CalendarYearPickerScrollerContent.tsx';
import { CalendarYearPickerScrollerLayout } from '../CalendarYearPickerScrollerLayout';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarYearPickerScrollerContent> = {
  title: 'Data/Calendar/CalendarYearPicker/CalendarYearPickerScrollerContent',
  component: CalendarYearPickerScrollerContent,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: <CalendarYearPickerScrollerLayout />
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};