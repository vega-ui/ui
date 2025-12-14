import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDayPickerScrollerLayout } from './CalendarDayPickerScrollerLayout.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarDayPickerScrollerLayout> = {
  title: 'Data/Calendar/CalendarDayPicker/CalendarDayPickerScrollerLayout',
  component: CalendarDayPickerScrollerLayout,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};