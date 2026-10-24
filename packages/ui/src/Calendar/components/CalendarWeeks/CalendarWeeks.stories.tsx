import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarWeeks } from './CalendarWeeks';
import { Calendar } from '../../Calendar';
import { CalendarDays } from '../CalendarDays';
import { CalendarDay } from '../CalendarDay';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarWeeks> = {
  title: 'Data/Calendar/CalendarWeeks',
  component: CalendarWeeks,
  decorators(Story) {
    return (
      <Calendar>
        <CalendarDays>
          <Story />
        </CalendarDays>
      </Calendar>
    )
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <CalendarDay />,
  },
};
