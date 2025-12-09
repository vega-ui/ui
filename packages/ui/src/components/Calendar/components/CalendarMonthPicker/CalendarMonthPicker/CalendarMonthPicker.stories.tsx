import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarMonthPicker } from './CalendarMonthPicker'
import { CalendarMonthPickerLayout } from '../CalendarMonthPickerLayout';
import { Calendar } from '../../../Calendar.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarMonthPicker> = {
  title: 'Data/Calendar/CalendarMonthPicker/CalendarMonthPicker',
  component: CalendarMonthPicker,
  args: {
    children: <CalendarMonthPickerLayout  />,
  },
  decorators(Story) {
    return <Calendar picker='month' style={{ height: 144 }}><Story /></Calendar>
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};