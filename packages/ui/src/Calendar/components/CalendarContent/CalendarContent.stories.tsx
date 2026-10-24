import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarContent } from './CalendarContent';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeekdays } from '../CalendarWeekdays';
import { CalendarWeekday } from '../CalendarWeekday';
import { CalendarWeeks } from '../CalendarWeeks';
import { CalendarDay } from '../CalendarDay';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarContent> = {
  title: 'Data/Calendar/CalendarContent',
  component: CalendarContent,
  args: {
    children: (
      <CalendarDays>
        <CalendarWeekdays>
          <CalendarWeekday />
        </CalendarWeekdays>
        <CalendarWeeks>
          <CalendarDay />
        </CalendarWeeks>
      </CalendarDays>
    ),
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};