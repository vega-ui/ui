import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarMonthPickerLayout } from './CalendarMonthPickerLayout.tsx'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarMonthPickerLayout> = {
  title: 'Data/Calendar/CalendarMonthPicker/CalendarMonthPickerLayout',
  component: CalendarMonthPickerLayout,
  args: {},
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};