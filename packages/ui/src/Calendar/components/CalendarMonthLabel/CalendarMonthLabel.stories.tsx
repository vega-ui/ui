import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarMonthLabel } from './CalendarMonthLabel'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarMonthLabel> = {
  title: 'Data/Calendar/CalendarMonthLabel',
  component: CalendarMonthLabel,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};