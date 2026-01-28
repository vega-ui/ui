import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarYearLabel } from './CalendarYearLabel'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarYearLabel> = {
  title: 'Data/Calendar/CalendarYearLabel',
  component: CalendarYearLabel,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};